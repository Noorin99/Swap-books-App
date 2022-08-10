import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserSec from "../components/UserSec";
import { store } from "../firebase/config";

function ProfileDemo() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [books, setBooks] = useState([]);

  const getId = async () => {
    const docRef = doc(store, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let { avatar, fname, description, twitter, instagram, city, facebook, email, myGives } =
        docSnap.data();
      getGives(myGives);
      setData({ avatar, fname, description, twitter, instagram, city, facebook, email });
    }
  };

  // to get all the books from gives
  const getGives = async (myGives) => {
    let arr = [];
    myGives.forEach(async (e) => {
      const docRef = doc(store, "books", e);
      const docSnap = await getDoc(docRef);
      arr.push({ ...docSnap.data(), id: docSnap.id });
      if (arr.length === myGives.length) {
        setBooks(arr);
      }
    });
  };

  useEffect(() => {
    getId();
  }, []);

  return (
    data && (
      <div>
        <UserSec data={data} edit={false} />
        <div className="line">
          <hr></hr>
          <br />
        </div>
        <div className="bowl_books_Tabs">
          {books.map((book) => (
            <Link to={`/book/${book.id}`} className="singleBook" key={book.id}>
              <div className="cover_book_profile">
                <img src={book.cover} alt={book.title} />
              </div>
              <div className="tilte_book_Tabs_pof">
                <span>{book.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  );
}

export default ProfileDemo;
