import React from 'react';
import { useState } from "react";
import { ReactComponent as Picture } from "../assets/images/community.svg";
import { TextField } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, provider, store } from "../firebase/config";




function ResetPassword() {
  const [email, setEmail] = useState("");

  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert('sent')
  })
  .catch((error) => {
    const errorMessage = error.message;
  });
    
  return (
    <div className="container2">
      <form  onSubmit={sendPasswordResetEmail} className="form_modal">
        <div className="title">
          <span>أدخل الإيميل لاستعادة كلمة المرور</span>
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
       
        <button type="submit" className="login_button">
          متابعة
        </button>
      </form>

      <div className="cover_login">
        <Picture />
      </div>
    </div>
  )
}

export default ResetPassword