import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  RadioGroup,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PhotoCamera } from "@mui/icons-material";
import { store } from "../firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { ReactComponent as Excellent } from "../assets/Excellent.svg";
import { ReactComponent as VeryGoodBook } from "../assets/VeryGoodBook.svg";
import { ReactComponent as GoodBook } from "../assets/GoodBook.svg";

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
  const { id: idUser, favorites = [], givesBooks = [] } = useSelector((state) => state.User);

  const handleChecked = (status) => {
    setBook({ ...books, status });
  };

  const handleaddbook = async (e) => {
    e.preventDefault();
    let { isbn } = books;
    const pathID = `no_${isbn.replace(/([^a-z0-9.]+)/gi, "").toLowerCase()}`;
    const docRef = doc(store, "books", pathID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let newGives = [...givesBooks, pathID];
      const docRef = doc(store, "users", idUser);
      await updateDoc(docRef, { givesBooks: newGives }).then(() => {
        console.log("update user 1");
      });
    } else {
      await setDoc(doc(store, "books", pathID), { ...books, id: pathID }).then(async () => {
        let newGives = [...givesBooks, pathID];
        const docRef = doc(store, "users", idUser);
        await updateDoc(docRef, { givesBooks: newGives }).then(() => {
          console.log("update user 2");
        });
      });
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
                  const imageBase = await convertToBase64(event.currentTarget.files[0]);
                  setBook({ ...books, cover: imageBase });
                }}
              />
              <Button
                variant="outlined"
                component="span"
                className="textfield_Addbook"
                sx={{
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}>
                <PhotoCamera sx={{ mr: 1, color: "#00A560" }} />
                غلاف الكتاب
              </Button>

              {books.cover && "تم اضافة الصورة بنجاح"}
            </label>

            <TextField
              id="filled-multiline-static"
              label="وصف الكتاب"
              variant="outlined"
              multiline
              rows={5}
              onChange={(e) => setBook({ ...books, description: e.target.value })}
            />

            <FormControl className="conterol_Bowl">
              <FormLabel id="demo-radio-buttons-group-label">حالة الكتاب</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="good"
                name="radio-buttons-group">
                <div className="rating">
                  <FormControlLabel
                    value="good"
                    control={
                      <IconButton
                        onClick={() => handleChecked("good")}
                        className={`bowl_Svg_State ${books.status === "good" && "active"}`}>
                        <GoodBook className="svg_type_Book" />
                      </IconButton>
                    }
                    labelPlacement="bottom"
                    label="جيد"
                  />
                  <FormControlLabel
                    value="verygood"
                    control={
                      <IconButton
                        onClick={() => handleChecked("verygood")}
                        className={`bowl_Svg_State ${books.status === "verygood" && "active"}`}>
                        <VeryGoodBook className="svg_type_Book" />
                      </IconButton>
                    }
                    labelPlacement="bottom"
                    label="جيد جداً"
                  />
                  <FormControlLabel
                    value="execlent"
                    control={
                      <IconButton
                        onClick={() => handleChecked("execlent")}
                        className={`bowl_Svg_State ${books.status === "execlent" && "active"}`}>
                        <Excellent className="svg_type_Book" />
                      </IconButton>
                    }
                    labelPlacement="bottom"
                    label="ممتازة"
                  />
                </div>
              </RadioGroup>
            </FormControl>
            <br />
          </div>
        </div>
        <button className="addbookbtnn" onClick={handleaddbook}>
          اضافة
        </button>
      </div>
      <div className="cover_Add_book">
        <img src="https://i.ibb.co/xqdSSv9/Layer-3.png" alt="" />
      </div>
    </div>
  );
}

export default AddBook;
