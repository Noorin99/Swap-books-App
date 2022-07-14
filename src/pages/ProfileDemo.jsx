import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserSec from "../components/UserSec";
import { store } from "../firebase/config";

function ProfileDemo() {
  const { id } = useParams();
  const [data, setData] = useState();

  const getId = async () => {
    const docRef = doc(store, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let { avatar, fname, description, twitter, instagram, city, facebook, email } =
        docSnap.data();
      setData({ avatar, fname, description, twitter, instagram, city, facebook, email });
    }
  };
  useEffect(() => {
    getId();
  }, []);

  return data ? (
    <div>
      <UserSec data={data} edit={false} />
    </div>
  ) : null;
}

export default ProfileDemo;
