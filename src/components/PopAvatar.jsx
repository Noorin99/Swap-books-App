import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";

function PopAvatar({ avatar }) {
  const [show, setShow] = useState(false);
  let noAVatar = "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif";

  const logout = () => {
    signOut(auth)
      .then(() => {
        location.replace("/login");
      })
      .catch((error) => {
        console.log("An error happened.", error);
      });
  };

  return (
    <div className="bowavanavcon">
      <div onClick={() => setShow(!show)} className="bowl_avatar_nav">
        <img src={avatar || noAVatar} alt="" />
      </div>
      {show && (
        <div className="pop_option_avatar">
          <button onClick={() => location.assign("/profile")}>حسابي</button>
          <button onClick={logout}>تسجيل الخروج</button>
        </div>
      )}
    </div>
  );
}

export default PopAvatar;
