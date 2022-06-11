import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";

function UserSec() {
  const [userData, setUserData] = React.useState({});

  const handleAddUser = () => {
    console.log("edit profile");
  };

  let avatar =
    "https://images.complex.com/complex/images/c_scale,f_auto,q_auto,w_1920/fl_lossy,pg_1/ok26lkxxcptihvwljzaw/girl-in-red?fimg-ssr-default";

  let fname = "لورينا محمد",
    description =
      "كاتبة محتوى اهتم بالروايات العربية كاتبة محتوى اهتم بالروايات العربية كاتبة محتوى اهتم بالروايات العربية كاتبة محتوى اهتم بالروايات العربية كاتبة محتوى اهتم بالروايات العربية";

  return (
    <div className="head_profile">
      <div className="info_user_profile">
        <div className="avatar_profile">
          <img src={avatar} alt="" />
        </div>
        <div className="details_profile">
          <div className="username">
            <span>{fname}</span>
          </div>
          <div className="description_profile">
            <span>{description}</span>
          </div>
          <ul>
            <li>
              <MdEmail color="00A560" />
              <span className="sub_line_destails">lorena@gmail.com</span>
            </li>
            <li>
              <FaFacebookF color="00A560" />
              <span className="sub_line_destails">https://www.facebook.com/lorina</span>
            </li>

            <li>
              <BiLocationPlus color="00A560" />
              <span className="sub_line_destails">خان يونس</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="btn_edit_profile">
        <button onClick={handleAddUser}>تعديل ملفك الشخصي</button>
      </div>
    </div>
  );
}

export default UserSec;
