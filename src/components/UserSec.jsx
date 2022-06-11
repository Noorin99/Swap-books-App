import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";
import Modal from "../components/Modal";
import { Box } from "@mui/material";
function UserSec() {
  const [userData, setUserData] = React.useState({
    name: "لورينا محمد",
    email: "mail@mail.com",
    location:"رفح",
    facebook:"facebook.com",
  });


  const handleAddUser = () => {
    console.log("edit profile");
  };



      return (
        <>
        {userData.description ? (
          
          <div className="wholepage">
            <div className="userpage">
                <img
                  className="userImg"
                  src="https://images.complex.com/complex/images/c_scale,f_auto,q_auto,w_1920/fl_lossy,pg_1/ok26lkxxcptihvwljzaw/girl-in-red?fimg-ssr-default"
                  alt=""
                />
              {/* <a href="/edit" className="editdata">
                  تعديل المعلومات الشخصية
                </a> */}
              </div>
    
              <div className="content">
                <p className="username">{userData.name}</p>
                <p className="userdesc">{userData.description}</p>
                <ul>
                  <li>
                    <MdEmail color="00A560" /> <span className="useremail">{userData.email}</span>
                  </li>
                  <li>
                    <FaFacebookF color="00A560" />
                    <span className="userfb">{userData.facebook}</span>
                  </li>
    
                  <li>
                    <BiLocationPlus color="00A560" />
                    <span className="usercity">{userData.location}</span>
                  </li>
                </ul>
              </div>
          </div>
        ) : (
          <div className="allpage">
          <div className="wholepage">
          <div className="userpage">
              <img
                className="userImg"
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                alt=""
              />
            </div>
    
            <div className="content">
            <p className="username">{userData.name}</p>
              <ul>
                <li>
                <MdEmail color="00A560" /> <span className="useremail">{userData.email}</span>
                </li>
              <li>
              قم بإنشاء ملفك الشخصي لتحصل على المزيد من الأصدقاء   
              </li>
              </ul>
            </div>
          
        </div>
          <div className="edditbtn">
          <Box sx={{ mt: "auto", ml: 2, mb: 2 }}>
              <Modal  />
            </Box>
        </div>
        </div>
        )}
        </>
      );
    }
    
    export default UserSec;

