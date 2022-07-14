import React, { useState } from "react";
import { ReactComponent as Picture } from "../assets/images/community.svg";
import { ReactComponent as Google } from "../assets/icons/google.svg";
import { TextField, Alert } from "@mui/material";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, provider, store } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (auth.currentUser.emailVerified) {
          window.location.assign("/profile");
        } else {
          setError(true);
          setErrorMessage("يجب عليك تأكيد الإيميل المرسل قبل تسجيل الدخول!");
        }
      })
      .catch((error) => {
        setError(true);
        const errorCode = error.message;
        if (errorCode == "Firebase: Error (auth/wrong-password).") {
          setErrorMessage("الإيميل أو كلمة المرور خطأ");
        } else if (errorCode == "Firebase: Error (auth/user-not-found).") {
          setErrorMessage("لا يوجد حساب منشأ بواسطة الإيميل المدخل. قم بانشاء حساب جديد!");
        } else {
          setErrorMessage(errorCode);
        }
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        location.assign("/profile");
      })
      .then((result) => {
        const email = result.user.email;
        const fname = result.user.displayName;
        getDoc(doc(store, "users", email)).then((docSnap) => {
          if (docSnap.exists()) {
            location.assign("/profile");
          } else {
            setDoc(doc(store, "users", email), {
              fname,
              email,
              DOJ: Date.now(),
            });
            location.assign("/profile");
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="container2">
      <form onSubmit={onLogin} className="form_modal">
        <div className="title">
          <span>بدل كتابك واحصل على أصدقاء جدد</span>
        </div>
        <button type="button" className="btn_login_With" onClick={signInWithGoogle}>
          سجل دخول باستخدام جوجل
          <Google />
        </button>

        <div className="title">
          <span>أو باستخدام الايميل</span>
        </div>

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
        {error ? <Alert severity="error">{errorMessage}</Alert> : null}
        <div className="check-container">
          <a href="/resetpassword" className="password-exist">
            نسيت كلمة المرور؟
          </a>
          <a href="/signup" className="password-exist">
            أنشئ حساب جديد
          </a>
        </div>
      </form>

      <div className="cover_login">
        <Picture />
      </div>
    </div>
  );
}

export default Login;
