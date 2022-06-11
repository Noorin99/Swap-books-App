import React from "react";
import BookTab from '../components/Profile/BookTab';
import UserSec from '../components/Profile/UserSec';
function Profile() {
  return  <div className='profile_continer'>
  <UserSec />
  <BookTab />
</div>;
}

export default Profile;
