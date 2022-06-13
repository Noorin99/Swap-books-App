import React, { useState } from "react";
import { ReactComponent as Picture } from "../assets/images/community.svg";
import { ReactComponent as Google } from "../assets/icons/google.svg";
import { ReactComponent as Facebook } from "../assets/icons/facebook.svg";
import { TextField } from "@mui/material";
import { auth, store } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = async (e) => {
    e.preventDefault();
    let log = { email, password, fname };
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(store, "users", user.uid), {
          fname,
          email,
          DOJ: Date.now(),
        }).then(() => {
          location.assign("/profile");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  };

  return (
    <div className="container">
      <form onSubmit={onSignup} className="form_modal">
        <div className="title">
          <span>بدل كتابك واحصل على أصدقاء جدد</span>
        </div>
        <button type="button" className="btn_login_With">
          سجل دخول باستخدام جوجل
          <Google />
        </button>
        <button type="button" className="btn_login_With">
          سجل دخول باستخدام فيسبوك
          <Facebook />
        </button>

        <div className="title">
          <span>أو باستخدام الايميل</span>
        </div>
        <TextField
          id="outlined-basic"
          label="الاسم كامل"
          size="medium"
          variant="outlined"
          type="text"
          className="input_login"
          required
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="أدخل الايميل"
          size="medium"
          variant="outlined"
          type="email"
          className="input_login"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="أدخل كلمة السر"
          size="medium"
          variant="outlined"
          type="password"
          required
          className="input_login"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login_button">
          سجل دخول
        </button>
      </form>

      <div className="cover_login">
        <Picture />
      </div>
    </div>
  );
}

export default Signup;
