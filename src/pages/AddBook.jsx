import React, { useState } from "react";
import { Autocomplete, Button, TextField, Alert, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PhotoCamera } from "@mui/icons-material";
import { storage, store } from "../firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const Input = styled("input")({
  display: "none",
});

const languageList = [
  "اللغة العربية",
  "اللغة الإنجليزية",
  "اللغة الألمانية",
  "اللغة التشيكية",
  "اللغة الإستريتية",
  "اللغة الإسبانية",
];

const categoryList = ["الخيال", "التاريخ", "القصص القصيرة", "القصص الطويلة", "الروايات", "الأدب"];

function AddBook() {
  const [books, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    language: "",
    status: "",
    cover: "",
    description: "",
    category: "",
  });
  const [coverEvent, setCoverEvent] = useState();
  const [loaderUp, setLoaderUp] = useState(false);

  const { id: idUser, givesBooks = [] } = useSelector((state) => state.User);
  const [errorMessage, setErrorMessage] = useState("");

  const handleaddbook = async (e) => {
    e.preventDefault();
    let { author, category, cover, description, isbn, language, status, title } = books;
    if (
      !author ||
      !category ||
      !cover ||
      !coverEvent ||
      !description ||
      !isbn ||
      !language ||
      !status ||
      !title
    ) {
      setErrorMessage("تأكد من ادخال جميع البيانات بشكل صحيح");
    } else {
      setErrorMessage("");
      setLoaderUp(true);

      let isbnSpaces = isbn.replace(/\s/g, "").toLowerCase();
      const pathID = `no_${isbnSpaces.replace(/([^a-z0-9.]+)/gi, "")}`;
      const refBook = doc(store, "books", pathID);
      const docSnap = await getDoc(refBook);
      if (docSnap.exists()) {
        let newGives = [...givesBooks, pathID];
        const refUser = doc(store, "users", idUser);
        await updateDoc(refUser, { givesBooks: newGives }).then(async () => {
          let users = { ...docSnap.data().users, [idUser]: status };
          await updateDoc(refBook, { users }).then(() => {
            location.assign(`/book/${isbnSpaces}`);
          });
        });
      } else {
        console.log(coverEvent);
        console.log(coverEvent.name);
        const path = `covers/${Date.now()}_${coverEvent.name.replace(/([^a-z0-9.]+)/gi, "")}`;
        let fileRef = ref(storage, path);
        const upload = uploadBytesResumable(fileRef, coverEvent);
        upload.on(
          "state_changed",
          async (sanpshot) => {
            const progress = (sanpshot.bytesTransferred / sanpshot.totalBytes) * 100;
            console.log(progress, " %");
          },
          (error) => {
            console.log(error.code);
          },
          async () => {
            let imgPath = await getDownloadURL(upload.snapshot.ref);
            await setDoc(doc(store, "books", pathID), {
              ...books,
              cover: imgPath,
              id: pathID,
            }).then(async () => {
              let newGives = [...givesBooks, pathID];
              const refUser = doc(store, "users", idUser);
              await updateDoc(refUser, { givesBooks: newGives }).then(async () => {
                let users = { [idUser]: status };
                await updateDoc(refBook, { users }).then(() => {
                  location.assign(`/book/${isbnSpaces}`);
                });
              });
            });
          }
        );
      }
    }
  };

  return (
    <div className="add_book_container">
      <div className="divwithbtn">
        <div className="bothdiv">
          <div className="rightAdd">
            <TextField
              id="outlined-basic"
              label="اسم الكتاب"
              size="medium"
              variant="outlined"
              className="textfield_Addbook"
              value={books.title}
              onChange={(e) => setBook({ ...books, title: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label="اسم المؤلف"
              size="medium"
              variant="outlined"
              className="textfield_Addbook"
              value={books.author}
              onChange={(e) => setBook({ ...books, author: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label=" الرقم الدولي المعياري للكتاب ISBN "
              size="medium"
              variant="outlined"
              className="textfield_Addbook"
              value={books.isbn}
              onChange={(e) => setBook({ ...books, isbn: e.target.value })}
            />
            <Autocomplete
              disablePortal
              options={languageList}
              className="textfield_Addbook"
              renderInput={(params) => <TextField {...params} label="لغة الكتاب" />}
              onChange={(event, newValue) => {
                setBook({ ...books, language: newValue });
              }}
            />
            <Autocomplete
              disablePortal
              options={categoryList}
              className="textfield_Addbook"
              renderInput={(params) => <TextField {...params} label="فئة  الكتاب" />}
              onChange={(event, newValue) => {
                setBook({ ...books, category: newValue });
              }}
            />
          </div>
          <div className="leftAdd">
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                type="file"
                id="icon-button-file"
                name="logo"
                onChange={async (event) => {
                  let file = event.currentTarget.files[0];
                  setCoverEvent(file);
                  const imageBase = await convertToBase64(file);
                  setBook({ ...books, cover: imageBase });
                }}
              />
              <Button
                variant="outlined"
                component="span"
                className="FormControl_Addbook"
                sx={{
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}>
                <PhotoCamera sx={{ mr: 1, color: "#00A560" }} />
                غلاف الكتاب
                {books?.cover ? <img className="cover_Add_Book" src={books.cover} alt="" /> : null}
              </Button>

              {books.cover && "تم اضافة الصورة بنجاح"}
            </label>
            <TextField
              id="filled-multiline-static"
              label="وصف الكتاب"
              variant="outlined"
              multiline
              rows={5}
              className="FormControl_Addbook"
              onChange={(e) => setBook({ ...books, description: e.target.value })}
            />
            <FormControl className="FormControl_Addbook">
              <InputLabel htmlFor="demo-dialog-native">حالة الكتاب</InputLabel>
              <Select
                native
                value={books.status}
                onChange={(event) => {
                  setBook({ ...books, status: Number(event.target.value) || "" });
                }}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}>
                <option aria-label="None" value="" />
                <option value={1}>كالجديد</option>
                <option value={2}>ممتاز</option>
                <option value={3}>جيد جدا</option>
                <option value={4}>جيد</option>
                <option value={5}>قابل للاستخدام</option>
              </Select>
            </FormControl>
          </div>
        </div>

        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
        <br />

        <button className="addbookbtnn" onClick={handleaddbook}>
          اضافة
          {loaderUp ? <CircularProgress color="inherit" size={25} /> : null}
        </button>
      </div>
      <div className="cover_Add_book">
        <img src="https://i.ibb.co/xqdSSv9/Layer-3.png" alt="" />
      </div>
    </div>
  );
}

export default AddBook;
