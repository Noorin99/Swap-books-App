import React from "react";
import BookTab from "../components/BookTab";
import UserSec from "../components/UserSec";

function Profile() {
  return (
    <div className="profile_continer">
      <UserSec />
      <BookTab />
    </div>
  );
}

export default Profile;
