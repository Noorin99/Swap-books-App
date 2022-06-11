import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const faviBooks = [
  {
    title: "The Lord of the Rings",
    cover: "http://www.4read.net/uploads/images/1480158996.jpg",
  },
  {
    title: "The Hobbit",
    cover:
      "https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg",
  },
  {
    title: "The Lord of the Rings",
    cover: "http://www.4read.net/uploads/images/1480158996.jpg",
  },
  {
    title: "The Hobbit",
    cover:
      "https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg",
  },
  {
    title: "The Lord of the Rings",
    cover: "http://www.4read.net/uploads/images/1480158996.jpg",
  },
  {
    title: "The Hobbit",
    cover:
      "https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg",
  },
  {
    title: "The Lord of the Rings",
    cover: "http://www.4read.net/uploads/images/1480158996.jpg",
  },
  {
    title: "The Hobbit",
    cover:
      "https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg",
  },
  {
    title: "The Lord of the Rings",
    cover: "http://www.4read.net/uploads/images/1480158996.jpg",
  },
  {
    title: "The Hobbit",
    cover:
      "https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg",
  },
  {
    title: "The Lord of the Rings",
    cover: "http://www.4read.net/uploads/images/1480158996.jpg",
  },
  {
    title: "The Hobbit",
    cover:
      "https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg",
  },
  {
    title: "The Lord of the Rings",
    cover: "http://www.4read.net/uploads/images/1480158996.jpg",
  },
  {
    title: "The Hobbit",
    cover:
      "https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg",
  },
];
const addedBooks = [
  {
    title: "The Lord of the Rings",
    cover: "http://www.4read.net/uploads/images/1480158996.jpg",
  },
  {
    title: "The Hobbit",
    cover:
      "https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg",
  },
  {
    title: "The Lord of the Rings",
    cover: "http://www.4read.net/uploads/images/1480158996.jpg",
  },
  {
    title: "The Hobbit",
    cover:
      "https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg",
  },
];

function BookTab() {
  const [value, setValue] = useState("0");
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [fbooks, setfBooks] = useState(faviBooks);
  const [books, setBooks] = useState(addedBooks);
  const navigate = useNavigate();

  const searchBook = () => {
    setIsSearch(!isSearch);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteFbooks = (index) => {
    const newfBooks = [...fbooks];
    newfBooks.splice(index, 1);
    setfBooks(newfBooks);
  };

  const handleDeleteFromFav = (index) => {
    const newBooks = [...books];
    newBooks.splice(index, 1);
    setBooks(newBooks);
  };

  const navigateToAddBook = () => {
    navigate("/addbook", { replace: true });
  };

  return (
    <Box sx={{ typography: "body1", marginTop: "30px" }}>
      <TabContext value={value}>
        {/* toggle tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} indicatorColor="secondary" textColor="primary">
            <Tab className="tab_profile" label="أضف كتاباً" value="0" />
            <Tab className="tab_profile" label="الكتب المضافة" value="1" />
            <Tab className="tab_profile" label="الكتب المفضلة" value="2" />
          </TabList>
        </Box>

        {/* content active tab */}
        <TabPanel value="0">
          <div className="addbook">
            <TextField
              style={{ width: 540 }}
              id="outlined-basic"
              label="ابحث عن كتابك باستخدام الاسم, ISBN"
              variant="outlined"
              value={search}
              onChange={handleSearch}
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
          {/* Each child in a list should have a unique "key" prop. */}
          <div className="favBooks">
            {fbooks.map((book, index) => (
              <div className="singleBook" key={index}>
                <div className="cover_book_profile">
                  <img src={book.cover} alt={book.title} />
                </div>
                <button className="delete_favorite_profile" onClick={() => deleteFbooks(index)}>
                  حذف
                </button>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="favBooks">
            {books.map((book, index) => (
              <div className="singleBook" key={index}>
                <div className="cover_book_profile">
                  <img src={book.cover} alt={book.title} className="bookImg" />
                </div>
                <button
                  className="delete_favorite_profile"
                  onClick={() => handleDeleteFromFav(index)}>
                  حذف
                </button>
              </div>
            ))}
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default BookTab;
