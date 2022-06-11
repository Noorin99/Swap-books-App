import React, { useState } from "react";
import { ReactComponent as Good } from "../../assets/icons/good.svg";

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
import "./style.css";
import { styled } from "@mui/material/styles";

import { PhotoCamera } from "@mui/icons-material";
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

function AddBookComponent() {
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

  const handleChecked = (status) => {
    setBook({ ...books, status });
  };

  const handleaddbook = (e) => {
    e.preventDefault();
    console.log(books);
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
              style={{ width: 300 }}
              value={books.title}
              onChange={(e) => setBook({ ...books, title: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label="اسم المؤلف"
              size="medium"
              variant="outlined"
              style={{ width: 300 }}
              value={books.author}
              onChange={(e) => setBook({ ...books, author: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label=" الرقم الدولي المعياري للكتاب ISBN "
              size="medium"
              variant="outlined"
              style={{ width: 300 }}
              value={books.isbn}
              onChange={(e) => setBook({ ...books, isbn: e.target.value })}
            />
            <Autocomplete
              disablePortal
              options={languageList}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="لغة الكتاب" />}
              onChange={(event, newValue) => {
                setBook({ ...books, language: newValue });
              }}
            />
            <Autocomplete
              disablePortal
              options={categoryList}
              sx={{ width: 300 }}
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
                sx={{
                  height: "56px",
                  width: "350px",
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

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">حالة الكتاب</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="good"
                name="radio-buttons-group">
                <div className="rating">
                  <FormControlLabel
                    value="good"
                    control={
                      <IconButton onClick={() => handleChecked("good")}>
                        <Good
                          style={{
                            width: 50,
                            height: 50,
                            fill: books.status === "good" ? "green" : "lightgray",
                          }}
                        />
                      </IconButton>
                    }
                    labelPlacement="bottom"
                    label="جيد"
                  />
                  <FormControlLabel
                    value="verygood"
                    control={
                      <IconButton onClick={() => handleChecked("verygood")}>
                        <Good
                          style={{
                            width: 50,
                            height: 50,
                            fill: books.status === "verygood" ? "green" : "lightgray",
                          }}
                        />
                      </IconButton>
                    }
                    labelPlacement="bottom"
                    label="جيد جداً"
                  />
                  <FormControlLabel
                    value="execlent"
                    control={
                      <IconButton onClick={() => handleChecked("execlent")}>
                        <Good
                          style={{
                            width: 50,
                            height: 50,
                            fill: books.status === "execlent" ? "green" : "lightgray",
                          }}
                        />
                      </IconButton>
                    }
                    labelPlacement="bottom"
                    label="ممتازة"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <button className="addbookbtnn" onClick={handleaddbook}>
          اضافة
        </button>
      </div>
      <div>
        <img className="molhemimg" src="https://i.ibb.co/xqdSSv9/Layer-3.png" alt="" />
      </div>
    </div>
  );
}

export default AddBookComponent;
