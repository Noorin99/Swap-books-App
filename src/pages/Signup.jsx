import React, { useState } from "react";
import { ReactComponent as Picture } from "../assets/images/community.svg";
import { ReactComponent as Google } from "../assets/icons/google.svg";
import { TextField, Alert } from "@mui/material";
import { auth, store, provider } from "../firebase/config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

function Signup() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSignup = async (e) => {
    e.preventDefault();
    let log = { email, password, fname };
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser).then(async (userCredential) => {
          location.assign("/verifyemail");
          const user = userCredential.user;
          await setDoc(doc(store, "users", user.email), {
            fname,
            email,
            DOJ: Date.now(),
          });
        });
      })
      .catch((error) => {
        setError(true);
        const errorCode = error.message;
        if (
          errorCode == "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setErrorMessage("يجب أن تكون كلمة المرور على الأقل مكونة من 6 عناصر");
        } else if (errorCode == "Firebase: Error (auth/email-already-in-use).") {
          setErrorMessage("يوجد حساب منشأ بواسطة هذا الإيميل. سجل دخول الان!");
        } else setErrorMessage(errorCode);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const fname = result.user.displayName;
        const email = result.user.email;
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
      <form onSubmit={onSignup} className="form_modal">
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
          أنشئ حساب جديد
        </button>
        {error ? <Alert severity="error">{errorMessage}</Alert> : null}
        <div className="check-container">
          <p>لديك حساب؟</p>
          <a href="/login" className="password-exist">
            سجل دخول{" "}
          </a>
        </div>
      </form>

      <div className="cover_login">
        <Picture />
      </div>
    </div>
  );
}

export default Signup;
