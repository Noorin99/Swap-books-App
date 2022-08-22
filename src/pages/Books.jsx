import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { store } from "../firebase/config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

function Books() {
  const [querySearch, setQuerySearch] = useState("");
  const [lang, setLang] = useState("");
  const [categories, setCategories] = useState();
  const [data, setData] = useState([]);

  const getBooks = async () => {
    let lng = lang || "ar";
    let value = categories
      ? categories
      : querySearch
      ? querySearch
      : lng === "ar"
      ? "كتب"
      : "books";

    try {
      const citiesRef = collection(store, "books");
      const q = categories
        ? query(citiesRef, where("language", "==", lng), where("category", "==", categories))
        : query(citiesRef, where("language", "==", lng));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let { cover, title, id } = doc.data();
        let log = { cover, title, id };
        setData((prev) => [...prev, log]);
      });

      let URL = `https://www.googleapis.com/books/v1/volumes?q=${value}&langRestrict=${lng}&key=AIzaSyBcd2dek9-5LPhIii3Y1mjr867aFfz2-gI&maxResults=25`;
      let { data } = await axios.get(URL);
      let arr = [];
      data?.items.forEach((e) => {
        let log = {
          cover: e.volumeInfo?.imageLinks?.thumbnail,
          id: e.id,
          title: e.volumeInfo.title,
        };
        arr.push(log);
      });
      setData((prev) => [...prev, ...arr]);
    } catch (err) {
      console.log(err);
    }
  };

  const getRandomFirst = async () => {
    const q = query(collection(store, "books"), limit(10));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((e) => {
      let { cover, id, title } = e.data();
      arr.push({ cover, id, title });
    });
    setData((prev) => [...prev, ...arr]);
    getBooks();
  };

  useEffect(() => {
    getRandomFirst();
  }, []);

  useEffect(() => {
    if (querySearch || categories || lang) {
      setData([]);
      getBooks();
    }
  }, [querySearch, categories, lang]);

  return (
    <div>
      <form className="form_filters">
        <TextField
          id="outlined-basic"
          label=" ابحث عن كتابك من خلال اسمه او  ISBN"
          size="medium"
          variant="outlined"
          type="email"
          className="input_login"
          required
          value={querySearch}
          onChange={(e) => setQuerySearch(e.target.value)}
        />
        <FormControl className="bowl_in_filter">
          <InputLabel id="demo-simple-select-label">اللغة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lang}
            label="اللغة"
            onChange={(e) => setLang(e.target.value)}>
            <MenuItem value="en">الانجليزية</MenuItem>
            <MenuItem value="ar">العربية</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="bowl_in_filter">
          <InputLabel id="demo-simple-select-label">فئة الكتاب</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categories}
            label="فئة الكتاب"
            onChange={(e) => setCategories(e.target.value)}>
            <MenuItem value="الخيال">الخيال</MenuItem>
            <MenuItem value="التاريخ">التاريخ</MenuItem>
            <MenuItem value="الروايات">الروايات</MenuItem>
            <MenuItem value="الأدب">الأدب</MenuItem>
            <MenuItem value="القصص القصيرة">القصص القصيرة</MenuItem>
            <MenuItem value="القصص الطويلة">القصص الطويلة</MenuItem>
          </Select>
        </FormControl>
      </form>

      <div className="bowl_cards_filter">
        {data.map((book, i) => (
          <Link to={`/book/${book.id}`} className="card_filter_book" key={i}>
            <div className="cover_book_filter">
              <img src={book.cover} alt={book?.title} />
            </div>
            <div className="title_Book_card">
              <span>{book.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Books;
