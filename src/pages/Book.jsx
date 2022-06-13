import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookStatus from "../components/BookStatus";


function Book() {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios(`https://www.googleapis.com/books/v1/volumes/${id}`);
      setData(data?.volumeInfo);
    }
    fetchData();
  }, []);

  return (
    <>
    <div className="container">
       <div className="book-details-container">
        <div className="cover-container">
          <img className="cover" src={data?.imageLinks?.smallThumbnail} alt="cover" />
        </div>
        <div className="details">
          <div className="title">
            <span>{data?.title}</span>
          </div>
          <div className="author">
            <span>{data?.authors[0]}</span>
          </div>
          <div className="description">
            <span>{data?.description}</span>
          </div>
          <div className="buttons">
            <div className="btn1">
                <BookStatus />
            </div>
            <button className="btn2">
              أضف للمفضلة <FavoriteBorderIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="line">
        <hr></hr>
      </div>
      <div className="users-container">
        <div className="title2">الكتاب متوفر لدى المستخدم</div>
        <div className="users">
          <div className="user">
            <div className="avatar">
              <img
                className="avatar2"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"
                alt="Avatar"
              />
            </div>
            <div className="name">
              <span>محمد محمد</span>
            </div>
            <div className="quality">
              <MenuBookIcon />
              <div className="status">ممتازة</div>
            </div>
            <div className="quality">
              <LocationOnIcon />
              <div className="status">غزة</div>
            </div>
            <div className="contact-button">شاهد الملف الشخصي</div>
          </div>
          <div className="user">
            <div className="avatar">
              <img
                className="avatar2"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"
                alt="Avatar"
              />
            </div>
            <div className="name">
              <span>محمد محمد</span>
            </div>
            <div className="quality">
              <MenuBookIcon />
              <div className="status">ممتازة</div>
            </div>
            <div className="quality">
              <LocationOnIcon />
              <div className="status">غزة</div>
            </div>
            <div className="contact-button">شاهد الملف الشخصي</div>
          </div>
        </div>
      </div>
    </div>
     
    </>
  );
}

export default Book;
