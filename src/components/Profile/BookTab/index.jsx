/* eslint-disable no-unused-vars */
import React from "react";
import Box from "@mui/material/Box";
import "./style.css";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function BookTab() {
  const [value, setValue] = React.useState("0");
  const [search, setSearch] = React.useState("");
  const [click, setClick] = React.useState(false);
  const navigate = useNavigate();

  const handleclick = () => {
    setClick(!click);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  ];
  const [fbooks, setfBooks] = React.useState(faviBooks);
  const deleteFbooks = (index) => {
    const newfBooks = [...fbooks];
    newfBooks.splice(index, 1);
    setfBooks(newfBooks);
  };
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
  const [books, setBooks] = React.useState(addedBooks);

  const handleDeleteFromFav = (index) => {
    const newBooks = [...books];
    newBooks.splice(index, 1);
    setBooks(newBooks);
  };
  const navigateToAddBook = (index) => {
    navigate("/addbook", { replace: true });

  }

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "50px" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="primary"
            >
              <Tab label="أضف كتاباً" value="0" />
              <Tab label="الكتب المضافة" value="1" />
              <Tab label="الكتب المفضلة" value="2" />
            </TabList>
          </Box>
          <TabPanel value="0">
            <div className="addbook">
              <TextField
                style={{ width: 540 }}
                id="outlined-basic"
                label="ابحث عن كتابك باستخدام الاسم, ISBN"
                size="medium"
                width="150px"
                variant="outlined"
                value={search}
                onChange={handleSearch}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    handleclick();
                    ev.preventDefault();
                  }
                }}
              />
              {click === false ? (
                <>
                  <h1>لإضافة كتاب جديد</h1>

                  <div className="steps">
                    <p>
                      قم بالبحث عن الكتاب باستخدام ( الإسم - ISBN ) في مربع
                      البحث
                    </p>
                    <p>قم بالضغط على الكتاب </p>
                    <p>
                      في صفحة الكتاب, قم بالضغط على زر أعط كتاب لإعطاء كتاب جديد
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h1>لإضافة كتاب جديد</h1>

                  <div className="add2">
                    <p>
                      لإضافة كتاب جديد على المنصة يرجى الضغط على أضف كتاب جديد
                    </p>
                    <button className="addbookbtn" onClick={navigateToAddBook}>أضف كتاب جديد</button>
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
                  <img className="bookImg" src={book.cover} alt={book.title} />
                  <button
                    className="btn-delete"
                    onClick={() => deleteFbooks(index)}
                  >
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
                  <img src={book.cover} alt={book.title} className="bookImg" />
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteFromFav(index)}
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default BookTab;
