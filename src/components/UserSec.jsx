import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";
import ModalEdit from "./ModalEdit";

let noAVatar = "https://hope.be/wp-content/uploads/2015/05/no-user-image.gif";

function UserSec({ data, edit }) {
  const [showEdit, setShowEdit] = useState(false);
  let { avatar, fname, description, twitter, instagram, city, facebook, email } = data;

  return (
    <div className="head_profile">
      <div className="info_user_profile">
        <div className="avatar_profile">
          <img src={avatar || noAVatar} alt="" />
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
                <a target="_blanck" href={facebook}>
                  <FaFacebookF color="00A560" />
                  <span className="sub_line_destails">{facebook}</span>
                </a>
              </li>
            )}
            {instagram && (
              <li>
                <a target="_blanck" href={instagram}>
                  <FaInstagram color="00A560" />
                  <span className="sub_line_destails">{instagram}</span>
                </a>
              </li>
            )}
            {twitter && (
              <li>
                <a target="_blanck" href={twitter}>
                  <FaTwitter color="00A560" />
                  <span className="sub_line_destails">{twitter}</span>
                </a>
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
      {edit && (
        <div className="btn_edit_profile">
          <button onClick={() => setShowEdit(true)}>تعديل ملفك الشخصي</button>
        </div>
      )}
      {showEdit && <ModalEdit setShowEdit={setShowEdit} />}
    </div>
  );
}

export default UserSec;
