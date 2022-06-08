import React from "react";
import Picture from "../assets/images/community.svg";
import Google from "../assets/icons/google.svg";
import Facebook from "../assets/icons/facebook.svg";

function Login() {
  return (
    <>
      <div className="container">
        <div className="form">
          <span className="title">بدل كتابك واحصل على أصدقاء جدد</span>
          <button className="btn">
            سجل دخول باستخدام جوجل
            <img src={Google} alt="Google" />
          </button>
          <button className="btn">
            سجل دخول باستخدام فيسبوك
            <img src={Facebook} alt="facebook" />
          </button>
          <span className="title">أو باستخدام الايميل</span>
          <input
            className="inpt"
            type="email"
            placeholder="أدخل الايميل"
          ></input>
          <input
            type="password"
            className="inpt"
            placeholder="أدخل كلمة السر"
          ></input>
          <button className="login_button">سجل دخول </button>
        </div>

        <div className="img">
          <img id="picture" src={Picture} alt="community" />
        </div>
      </div>
    </>
  );
}

export default Login;
