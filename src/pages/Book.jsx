import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const STATUS = ["كالجديد", "ممتاز", "جيد جدا", "جيد", "قابل للاستخدام"];
function Book() {
  const { id: idUser, favorites = [], myGives = [] } = useSelector((state) => state.User);
  const [data, setData] = useState();
  const [showGive, setShowGive] = useState(false);
  const [status, setStatus] = useState("");
  const [gives, setGives] = useState();
  const [profilesGives, setProfilesGives] = useState([]);
  const [checkFav, setCheckFav] = useState(false);
  const [isGoLogin, setIsGoLogin] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();
  let idBook = id.toLowerCase();

  // get book by id with google API for books
  const getBookApi = async () => {
    const { data } = await axios(`https://www.googleapis.com/books/v1/volumes/${id}`);
    let log = {
      cover: data?.volumeInfo?.imageLinks?.smallThumbnail,
      title: data?.volumeInfo?.title,
      author: data?.volumeInfo?.authors[0],
      description: data?.volumeInfo?.description || "",
    };
    setData(log);
  };

  // call first api then check firebase if not found there
  const getBookToggle = async () => {
    await getBookApi().catch(async () => {
      // check now on firebase
      const docSnap = await getDoc(doc(store, "books", idBook));
      setData(docSnap.data());
    });
  };

  // call fun that check if book available on firebase or api
  useEffect(() => {
    if (idBook) getBookToggle();
  }, [idBook]);

  // get users who can give this book
  const getWhoGives = async () => {
    const docRef = doc(store, "books", idBook);
    const docSnap = (await getDoc(docRef)) || {};
    let { users } = docSnap.data();
    setGives(users);
    for (const key in users) {
      const docRef = doc(store, "users", key);
      const docSnap = await getDoc(docRef);
      let data = { id: docSnap.id, ...docSnap.data(), status: users[key] };
      setProfilesGives((prev) => [...prev, data]);
    }
  };

  // to call and check book and users gives
  useEffect(() => {
    if (idUser) {
      setGives([]);
      setProfilesGives([]);
      getWhoGives();
    }
  }, [idUser]);

  // toggle book to user favorites
  const addToFavorite = async () => {
    if (!idUser) {
      setCheckFav(true);
    } else {
      setCheckFav(false);
      let oldFav = favorites || [];
      let latest = [];
      if (oldFav.includes(idBook)) latest = oldFav.filter((e) => e !== idBook);
      else latest = [...oldFav, idBook];
      const upData = doc(store, "users", idUser);
      await updateDoc(upData, { favorites: latest }).then(async () => {
        const docSnap = await getDoc(upData);
        dispatch(setUserStore({ ...docSnap.data() }));
      });
    }
  };

  // update this book with this user
  const updateUserGives = async () => {
    let newGives = [];
    if (myGives.includes(idBook)) newGives = myGives.filter((e) => e !== idBook);
    else newGives = [...myGives, idBook];
    await updateDoc(doc(store, "users", idUser), { myGives: newGives }).then(() => {
      dispatch(setUserStore({ myGives: newGives }));
      setProfilesGives([]);
      getWhoGives();
    });
  };

  // add or update book on firebase
  const giveBook = async () => {
    const docRef = doc(store, "books", idBook);
    const docSnap = await getDoc(docRef);
    try {
      if (docSnap.exists()) {
        let { users } = docSnap.data() || {};
        let oldUsers = users || {};
        if (oldUsers[idUser]) delete oldUsers[idUser];
        else oldUsers = { ...oldUsers, [idUser]: status };

        let log = { id: idBook, ...data, users: oldUsers };
        await updateDoc(docRef, log).then(() => {
          setGives(oldUsers);
          setShowGive(false);
          updateUserGives();
        });
      } else {
        let log = { id: idBook, ...data, users: { [idUser]: status } };
        await setDoc(doc(store, "books", idBook), log).then(() => {
          setGives([{ [idUser]: status }]);
          setShowGive(false);
          updateUserGives();
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkMove = (idBook) => {
    if (idUser) {
      setIsGoLogin(false);
      navigate(`/profile/${idBook}`);
    } else {
      setIsGoLogin(true);
    }
  };

  return (
    <div className="container">
      {checkFav || isGoLogin ? (
        <Dialog disableEscapeKeyDown open={true} onClose={() => setCheckFav(false)}>
          <div className="dialog-title-sub2">
            <DialogTitle>يرجى تسجيل الدخول اولا الى حسابك!</DialogTitle>
            <Link to="/login">تسجيل الدخول الان</Link>
          </div>
        </Dialog>
      ) : null}
      <div className="book-details-container">
        <div className="cover-container">
          <img className="cover" src={data?.cover} alt="cover" />
        </div>
        <div className="details">
          <div className="title">
            <span>{data?.title}</span>
          </div>
          <div className="author">
            <span>{data?.author}</span>
          </div>
          {data?.description ? (
            <div className="description">
              <Markup content={data.description} />
            </div>
          ) : null}
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
            {favorites && favorites.includes(idBook) ? (
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
          {profilesGives.length ? (
            profilesGives.map(({ id, avatar, fname, city, status }) => (
              <div onClick={() => checkMove(id)} className="user" key={id}>
                <div>
                  <img className="avatar_who_gives" src={avatar} alt="Avatar" />
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
                <div className="contact-button">شاهد الملف الشخصي</div>
              </div>
            ))
          ) : (
            <div className="valid_books">لا يوجد كتب متوفرة</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Book;
