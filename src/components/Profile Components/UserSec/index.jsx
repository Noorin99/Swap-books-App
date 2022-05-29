import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";
import "./style.css";
function UserSec() {
  return (
    <>
      <div className="wholepage">
        <div className="userpage">
            <img
              className="userImg"
              src="https://images.complex.com/complex/images/c_scale,f_auto,q_auto,w_1920/fl_lossy,pg_1/ok26lkxxcptihvwljzaw/girl-in-red?fimg-ssr-default"
              alt=""
            />
          <a href="/edit" class="editdata">
              تعديل المعلومات الشخصية
            </a>
          </div>

          <div className="content">
            <p className="username">لورينا محمد</p>
            <p className="userdesc">كاتبة محتوى اهتم بالروايات العربية</p>
            <ul>
              <li>
                <MdEmail color="00A560" /> <span className="useremail">lorena@gmail.com</span>
              </li>
              <li>
                <FaFacebookF color="00A560" />
                <span className="userfb">https://www.facebook.com/lorina</span>
              </li>

              <li>
                <BiLocationPlus color="00A560" />
                <span className="usercity">خان يونس</span>
              </li>
            </ul>
          </div>
      </div>
    </>
  );
}

export default UserSec;
