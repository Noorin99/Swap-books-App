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
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        sendEmailVerification(auth.currentUser).then(async () => {
          let log = { fname, email, DOJ: Date.now() };
          await setDoc(doc(store, "users", user.uid), log).then(() => {
            location.assign("/verifyemail");
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

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async ({ user }) => {
        const { uid, displayName, email, photoURL } = user;
        let docSnap = await getDoc(doc(store, "users", uid));
        if (docSnap.exists()) {
          location.assign("/profile");
        } else {
          let log = {
            fname: displayName,
            email,
            avatar: photoURL,
            DOJ: Date.now(),
          };
          setDoc(doc(store, "users", uid), log).then(() => {
            location.assign("/profile");
          });
        }
      })
      .catch((error) => {
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

  return (
    <div className="container2">
      <form onSubmit={onSignup} className="form_modal">
        <div className="title-login">
          <span>بدل كتابك واحصل على أصدقاء جدد</span>
        </div>
        <button type="button" className="btn_login_With" onClick={signInWithGoogle}>
          سجل دخول باستخدام جوجل
          <Google />
        </button>

        <div className="title-login">
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
