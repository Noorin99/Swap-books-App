import React from 'react'
import BookTab from '../../components/Profile Components/BookTab'
import UserSec from '../../components/Profile Components/UserSec'
import './style.css'
function index() {
  return (
    <div className='profile_continer'>
        <UserSec />
        <BookTab />
    </div>
  )
}

export default index