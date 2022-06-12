import React, { useState } from "react";
import Picture from "../../assets/images/addbook.svg";
import Upload from "../../assets/icons/Upload.svg";

import { Link } from "react-router-dom";
import "./style.css";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
function AddBook() {
  const [img, setImg] = useState("");
  const FileUload = async (e) => {
    var file = e.target.files;
    console.info("e", file);
    var base64 = await getBase64(file[0]);
    console.info("e", base64);
    setImg(base64);
  };

  return (
    <>
      <div className="container">
        <div className="form">
          <div className="upload">
            <span>ارفع صورة لغلاف الكتاب </span>
            <div className="upload-content">
              <input type="file" onChange={FileUload} />
              <img src={img.length ? img : Upload} alt="UploadBook" />
            </div>
          </div>
          <span className="upload">وصف الكتاب</span>
          <input className="input" type="text"></input>
          <button className="add_button">أضف الكتاب </button>
          <div>
            <Link className="header_elements" component={Link} to="/">
              <span className="doot"></span>
            </Link>
            <Link className="header_elements" component={Link} to="/">
              <span className="doot"></span>
            </Link>
          </div>
        </div>

        <div className="img">
          <img id="picture" src={Picture} alt="addbook" />
        </div>
      </div>
    </>
  );
}

export default AddBook;
