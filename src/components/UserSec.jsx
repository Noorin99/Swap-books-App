import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";
import ModalEdit from "./ModalEdit";
import { useSelector } from "react-redux";

function UserSec() {
  const [showEdit, setShowEdit] = useState(false);
  const { avatar, fname, description, city, facebook, email } = useSelector((state) => state.User);

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
            {email && (
              <li>
                <MdEmail color="00A560" />
                <span className="sub_line_destails">{email}</span>
              </li>
            )}
            {facebook && (
              <li>
                <FaFacebookF color="00A560" />
                <span className="sub_line_destails">https://www.facebook.com/lorina</span>
              </li>
            )}

            {city && (
              <li>
                <BiLocationPlus color="00A560" />
                <span className="sub_line_destails">{city}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="btn_edit_profile">
        <button onClick={() => setShowEdit(true)}>تعديل ملفك الشخصي</button>
      </div>
      {showEdit && <ModalEdit setShowEdit={setShowEdit} />}
    </div>
  );
}

export default UserSec;
