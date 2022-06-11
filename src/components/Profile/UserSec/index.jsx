import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";
import "./style.css";
function UserSec() {
  const [userData, setUserData] = React.useState({});

  const handleAddUser=()=>{
    const newUserData = {...userData};
    newUserData.name = "";
    newUserData.email = "";
    newUserData.address = "";
    setUserData(newUserData);
  }




 
    
   

  return (
    <>
    {Object.keys(userData).length > 0 ? (
      
      <div className="wholepage">
        <div className="userpage">
            <img
              className="userImg"
              src="https://images.complex.com/complex/images/c_scale,f_auto,q_auto,w_1920/fl_lossy,pg_1/ok26lkxxcptihvwljzaw/girl-in-red?fimg-ssr-default"
              alt=""
            />
          <a href="/edit" className="editdata">
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
          <p className="username">لورينا محمد</p>
          <ul>
            <li>
              <MdEmail color="00A560" /> <span className="useremail">lorena@gmail.com</span>
            </li>
          <li>
          قم بإنشاء ملفك الشخصي لتحصل على المزيد من الأصدقاء   
          </li>
          </ul>
        </div>
      
    </div>
      <div className="edditbtn">
      <button className="createprofile" onClick={handleAddUser}>
        إنشاء ملفك الشخصي
      </button>
    </div>
    </div>
    )}
    </>
  );
}

export default UserSec;
