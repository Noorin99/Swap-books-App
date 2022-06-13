import React from "react";
import BookTab from "../components/BookTab";
import UserSec from "../components/UserSec";
import { useSelector } from "react-redux";

function Profile() {
  const { avatar, fname, description, twitter, instagram, city, facebook, email } = useSelector(
    (state) => state.User
  );

  return (
    <div className="profile_continer">
      <UserSec
        edit={true}
        data={{ avatar, fname, description, twitter, instagram, city, facebook, email }}
      />
      <BookTab />
    </div>
  );
}

export default Profile;
