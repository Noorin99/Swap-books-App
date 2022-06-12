import React from "react";
import Picture from "../../assets/images/addbook.svg";
import Excellent from "../../assets/icons/Excellent.svg";
import VeryGood from "../../assets/icons/VeryGood.svg";
import Good from "../../assets/icons/Good.svg";
import { Link } from "react-router-dom";

import "./style.css";
function FormBook1() {
  return (
    <>
      <div className="container">
        <div className="form">
          <input className="inpt" type="text" placeholder="اسم الكتاب"></input>
          <input type="text" className="inpt" placeholder="اسم المؤلف"></input>
          <input
            className="inpt"
            type="number"
            placeholder="الرقم الدولي المعياري للكتاب ISBN"
          ></input>
          <select>
            <optgroup>
              <option value="">لغة الكتاب </option>
              <option value="">اللغة العربية</option>
              <option value="">اللغة الانجليزية</option>
            </optgroup>
          </select>
          <select>
            <optgroup>
              <option value="">فئة الكتاب </option>
              <option value="">أدب</option>
              <option value="">قصص أطفال</option>
              <option value="">خيال علمي</option>
              <option value="">كتب دينية</option>
            </optgroup>
          </select>
          <div className="state">
            <span>حالة الكتاب </span>
            <div className="dir">
              <img src={Good} alt="Good" />
              <span>جيد</span>
            </div>
            <div className="dir">
              <img src={VeryGood} alt="VeryGood" />
              <span>جيد جدا</span>
            </div>
            <div className="dir">
              <img src={Excellent} alt="Excellent" />
              <span>ممتاز</span>
            </div>
          </div>
          <button className="next_button">التالي </button>
          <div>
            <span class="dot1"></span>

            <Link className="header_elements" component={Link} to="/">
              <span class="dot2"></span>
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

export default FormBook1;
