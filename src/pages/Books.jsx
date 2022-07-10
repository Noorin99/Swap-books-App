import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

function Books() {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("");
  const [categories, setCategories] = useState();
  const [data, setData] = useState([]);

  const getBooks = async () => {
    let value =
      query && categories ? query + categories : query ? query : categories ? categories : "books";
    let lng = lang || "ar";
    try {
      let { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&langRestrict=${lng}&key=AIzaSyBcd2dek9-5LPhIii3Y1mjr867aFfz2-gI&maxResults=25`
      );
      setData(data?.items);
      console.log(data.items[0]);
    } catch {
      // retuen
      console.log("error");
    }
  };

  useEffect(() => {
    setData([]);
    getBooks();
  }, [query, categories, lang]);

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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <FormControl className="bowl_in_filter">
          <InputLabel id="demo-simple-select-label">اللغة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lang}
            label="اللغة"
            onChange={setLang}>
            <MenuItem value="volvo">En</MenuItem>
            <MenuItem value="saab">Ar</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="bowl_in_filter">
          <InputLabel id="demo-simple-select-label">فئة الكتاب</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categories}
            label="فئة الكتاب"
            onChange={setCategories}>
            <MenuItem value="Young Adult Fiction">Young Adult Fiction</MenuItem>
            <MenuItem value="Juvenile Fiction">Juvenile Fiction</MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Computers">Computers</MenuItem>
          </Select>
        </FormControl>
      </form>

      <div className="bowl_cards_filter">
        {data.map((book) => (
          <Link to={`/book/${book.id}`} className="card_filter_book" key={book.id}>
            <div className="cover_book_filter">
              <img src={book.volumeInfo?.imageLinks?.thumbnail} alt={book?.title} />
            </div>
            <div className="title_Book_card">
              <span>{book.volumeInfo.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Books;
