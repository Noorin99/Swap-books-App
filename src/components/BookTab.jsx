import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import axios from "axios";

function BookTab() {
  const [value, setValue] = useState("0");
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [fbooks, setfBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { id, myGives = [], favorites = [] } = useSelector((state) => state.User);

  // to get all the books from gives
  const getGives = async () => {
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

  // to get all the books from favorites
  const getFavorites = async () => {
    let arr = [];
    favorites.forEach(async (e) => {
      const docRef = doc(store, "books", e);
      const docSnap = await getDoc(docRef);
      arr.push({ ...docSnap.data(), id: docSnap.id });
      if (arr.length === favorites.length) {
        setfBooks(arr);
      }
    });
  };

  useEffect(() => {
    if (id) {
      getGives();
      getFavorites();
    }
  }, [id]);

  const checkIfFound = async () => {
    try {
      const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes/${search}`);
      return data?.volumeInfo ? true : false;
    } catch {
      return false;
    }
  };

  const searchBook = async () => {
    let state = await checkIfFound();
    console.log(state);
    if (state) return navigate(`/book/${search}`);
    let isbn = search.toLowerCase();
    const docRef = doc(store, "books", isbn);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return navigate(`/book/${search}`);
    setIsSearch(true);
  };

  const deleteFbooks = async (idBook) => {
    let newFav = favorites.filter((e) => e !== idBook);
    const docRef = doc(store, "users", id);
    await updateDoc(docRef, { favorites: newFav });
    let newfBooks = fbooks.filter((e) => e.id !== idBook);
    setfBooks(newfBooks);
  };

  const deleteFromGives = async (idBook) => {
    let newGives = myGives.filter((e) => e !== idBook);
    let newGivesState = books.filter((e) => e.id !== idBook);
    let usersBook = books.filter((e) => e.id === idBook);
    usersBook = usersBook.users || {};
    delete usersBook[idBook];
    setBooks(newGivesState);
    const docRef = doc(store, "users", id);
    await updateDoc(docRef, { myGives: newGives }).then(async () => {
      const docBook = doc(store, "books", idBook);
      await updateDoc(docBook, { users: usersBook });
    });
  };

  const navigateToAddBook = () => {
    navigate("/addbook", { replace: true });
  };

  return (
    <Box sx={{ typography: "body1", marginTop: "30px" }}>
      <TabContext value={value}>
        {/* toggle tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className="bowl_tab_pof"
            indicatorColor="secondary"
            textColor="primary">
            <Tab className="tab_profile" label="أضف كتاباً" value="0" />
            <Tab className="tab_profile" label="الكتب المضافة" value="1" />
            <Tab className="tab_profile" label="الكتب المفضلة" value="2" />
          </TabList>
        </Box>

        {/* content active tab */}
        <TabPanel value="0">
          <div className="addbook">
            <TextField
              className="search_input_in_profile"
              id="outlined-basic"
              label="ابحث عن كتابك باستخدام الاسم, ISBN"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(ev) => ev.key === "Enter" && searchBook()}
            />

            {isSearch === false ? (
              <>
                <h1>لإضافة كتاب جديد</h1>
                <div className="steps">
                  <p>قم بالبحث عن الكتاب باستخدام ( الإسم - ISBN ) في مربع البحث</p>
                  <p>قم بالضغط على الكتاب </p>
                  <p>في صفحة الكتاب, قم بالضغط على زر أعط كتاب لإعطاء كتاب جديد</p>
                </div>
              </>
            ) : (
              <>
                <h1>لإضافة كتاب جديد</h1>
                <div className="add2">
                  <p>لإضافة كتاب جديد على المنصة يرجى الضغط على أضف كتاب جديد</p>
                  <button className="addbookbtn" onClick={navigateToAddBook}>
                    أضف كتاب جديد
                  </button>
                </div>
              </>
            )}
          </div>
        </TabPanel>
        <TabPanel value="1">
          <div className="bowl_books_Tabs">
            {books?.length
              ? books.map((book) => (
                  <Link to={`/book/${book.id}`} className="singleBook" key={book.id}>
                    <div className="cover_book_profile">
                      <img src={book.cover} alt={book.title} className="bookImg" />
                    </div>
                    <div className="tilte_book_Tabs_pof">
                      <span>{book.title}</span>
                    </div>
                    <button
                      className="delete_favorite_profile"
                      onClick={() => deleteFromGives(book.id)}>
                      حذف
                    </button>
                  </Link>
                ))
              : null}
          </div>
        </TabPanel>
        <TabPanel value="2">
          {/* Each child in a list should have a unique "key" prop. */}
          <div className="bowl_books_Tabs">
            {fbooks.map((book) => (
              <Link to={`/book/${book.id}`} className="singleBook" key={book.id}>
                <div className="cover_book_profile">
                  <img src={book.cover} alt={book.title} />
                </div>
                <div className="tilte_book_Tabs_pof">
                  <span>{book.title}</span>
                </div>
                <button className="delete_favorite_profile" onClick={() => deleteFbooks(book.id)}>
                  حذف
                </button>
              </Link>
            ))}
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default BookTab;
