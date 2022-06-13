import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import BookStatus from "../components/BookStatus";
import { useDispatch, useSelector } from "react-redux";
import { Markup } from "interweave";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { store } from "../firebase/config";
import { setUserStore } from "../stores/User";

const STATUS = ["كالجديد", "ممتاز", "جيد جدا", "جيد", "قابل للاستخدام"];
function Book() {
  const [data, setData] = useState();
  const [showGive, setShowGive] = useState(false);
  const { id } = useParams();
  const { id: idUser, favorites = [], givesBooks = [] } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const pathID = `no_${id.replace(/([^a-z0-9.]+)/gi, "").toLowerCase()}`;
  const [gives, setGives] = useState();
  const [profilesGives, setProfilesGives] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios(`https://www.googleapis.com/books/v1/volumes/${id}`);
      setData(data?.volumeInfo);
    }
    fetchData();
  }, []);

  const getWhoGives = async () => {
    setGives([]);
    setProfilesGives([]);
    const docRef = doc(store, "books", pathID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let { users } = docSnap.data();
      setGives(users);
      for (const key in users) {
        const docRef = doc(store, "users", key);
        const docSnap = await getDoc(docRef);
        let data = { id: docSnap.id, ...docSnap.data(), status: users[key] };
        setProfilesGives((prev) => [...prev, data]);
      }
    }
  };

  useEffect(() => {
    if (idUser) {
      getWhoGives();
    }
  }, [idUser]);

  const addToFavorite = async () => {
    let oldFav = favorites || [];
    let latest = [];
    if (oldFav.includes(pathID)) {
      latest = oldFav.filter((e) => e !== pathID);
    } else {
      latest = [...oldFav, pathID];
    }
    console.log(latest);
    const upData = doc(store, "users", idUser);
    await updateDoc(upData, { favorites: latest }).then(async () => {
      const docSnap = await getDoc(upData);
      dispatch(setUserStore({ ...docSnap.data() }));
    });
  };

  const updateUserGives = async () => {
    let newGives = [...givesBooks, pathID];
    const docRef = doc(store, "users", idUser);
    await updateDoc(docRef, { givesBooks: newGives }).then(() => {
      console.log("update user");
    });
  };
  const deleteGiveUser = async () => {
    let newGives = givesBooks.filter((e) => e !== pathID);
    const docRef = doc(store, "users", idUser);
    await updateDoc(docRef, { givesBooks: newGives }).then(() => {
      console.log("update user");
    });
  };

  const giveBook = async () => {
    let logBook = {
      id,
      title: data?.title,
      cover: data?.imageLinks?.smallThumbnail,
      author: data?.authors[0],
      description: data?.description || " ",
    };

    // check if book exists
    const docRef = doc(store, "books", pathID);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        let { users } = docSnap.data();
        if (users[idUser]) {
          let newUsers = users;
          delete newUsers[idUser];
          await updateDoc(docRef, { ...logBook, users: newUsers }).then(() => {
            setGives(newUsers);
            setShowGive(false);
            deleteGiveUser();
          });
        } else {
          let newUsers = { ...users, [idUser]: status };
          await updateDoc(docRef, { ...logBook, users: newUsers }).then(() => {
            setGives(newUsers);
            setShowGive(false);
            updateUserGives();
          });
        }
      } else {
        await setDoc(doc(store, "books", pathID), {
          ...logBook,
          users: { [idUser]: status },
        }).then(() => {
          setGives([{ [idUser]: status }]);
          setShowGive(false);
          updateUserGives();
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="book-details-container">
        <div className="cover-container">
          <img className="cover" src={data?.imageLinks?.smallThumbnail} alt="cover" />
        </div>
        <div className="details">
          <div className="title">
            <span>{data?.title}</span>
          </div>
          <div className="author">
            <span>{data?.authors[0]}</span>
          </div>
          <div className="description">
            <Markup content={data?.description} />
          </div>
          <div className="buttons">
            {gives && gives[idUser] ? (
              <div className="btn1" onClick={giveBook}>
                ازالة الكتاب <HelpOutlineIcon />
              </div>
            ) : (
              <div className="btn1" onClick={() => setShowGive(true)}>
                أعط الكتاب <HelpOutlineIcon />
              </div>
            )}
            {favorites && favorites.includes(pathID) ? (
              <button className="btn2" onClick={addToFavorite}>
                ازالة من للمفضلة <FavoriteIcon color="error" />
              </button>
            ) : (
              <button className="btn2" onClick={addToFavorite}>
                أضف للمفضلة <FavoriteBorderIcon />
              </button>
            )}
          </div>
        </div>
      </div>
      {showGive && (
        <BookStatus
          setStatus={setStatus}
          status={status}
          giveBook={giveBook}
          setShowGive={setShowGive}
        />
      )}
      <div className="line">
        <hr></hr>
      </div>
      <div className="users-container">
        <div className="title2">الكتاب متوفر لدى المستخدم</div>
        <div className="users">
          {profilesGives.length &&
            profilesGives.map(({ id, avatar, fname, city, status }) => (
              <div className="user" key={id}>
                <div className="avatar">
                  <img className="avatar2" src={avatar} alt="Avatar" />
                </div>
                <div className="name">
                  <span>{fname}</span>
                </div>
                <div className="quality">
                  <MenuBookIcon />
                  <div className="status">{STATUS[status]}</div>
                </div>
                <div className="quality">
                  <LocationOnIcon />
                  <div className="status">{city}</div>
                </div>
                <Link to={`/profile/${id}`} className="contact-button">
                  شاهد الملف الشخصي
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Book;
