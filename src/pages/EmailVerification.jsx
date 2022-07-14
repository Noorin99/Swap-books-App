import React from "react";
import { useNavigate } from "react-router-dom";

function EmailVerification() {
  let navigate = useNavigate();

  const routeTo = (to) => {
    navigate(to);
  };

  return (
    <div className="general-container">
      <div className="verify-email-container">
        <h1>نحن بانتظارك لتصبح جزءاً من مجتمع ملهم!</h1>
        <h4>لقد قمنا بارسال ايميل تأكيد الى ايميلك</h4>
        <p>قم بتأكيد الإيميل الخاص بك ثم سجل دخول!</p>
        <button className="login_button" onClick={() => routeTo("/login")}>
          سجل دخول
        </button>
      </div>
    </div>
  );
}

export default EmailVerification;
