import React from "react";
import Box from "@mui/material/Box";
import "./style.css";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { TextField } from "@material-ui/core";
function BookTab() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
              <Tab label="أضف كتاباً" value="1" />
              <Tab label="الكتب المضافة" value="2" />
              <Tab label="الكتب المفضلة" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="addbook">
              <TextField
                style={{ width: 540 }}
                id="outlined-basic"
                label="ابحث عن كتابك باستخدام الاسم, ISBN"
                size="medium"
                width="150px"
                variant="outlined"
              />
              <h1>لإضافة كتاب جديد</h1>
              <div className="steps">
                <p>
                  قم بالبحث عن الكتاب باستخدام ( الإسم - ISBN ) في مربع البحث
                </p>
                <p>قم بالضغط على الكتاب </p>
                <p>
                  في صفحة الكتاب, قم بالضغط على زر أعط كتاب لإعطاء كتاب جديد{" "}
                </p>
              </div>{" "}
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="favBooks">
            <div className="singleBook">
                  <div xs={3}>
                    <img
                      src="http://www.4read.net/uploads/images/1480158996.jpg"
                     className="bookImg"
                      alt=""
                    />
                  </div>
                  <button className="btn-delete">حذف</button>
                </div>
                <div className="singleBook">
                  <div xs={3}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg"
                      className="bookImg"

                      alt=""
                    />
                  </div>
                  <button className="btn-delete">حذف</button>
                </div>
                <div className="singleBook">
                  <div xs={3}>
                    <img
                      src="http://www.4read.net/uploads/images/1480158996.jpg"
                     className="bookImg"
                      alt=""
                    />
                  </div>
                  <button className="btn-delete">حذف</button>
                </div>
                <div className="singleBook">
                  <div xs={3}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg"
                      className="bookImg"

                      alt=""
                    />
                  </div>
                  <button className="btn-delete">حذف</button>
                </div>    <div className="singleBook">
                  <div xs={3}>
                    <img
                      src="http://www.4read.net/uploads/images/1480158996.jpg"
                     className="bookImg"
                      alt=""
                    />
                  </div>
                  <button className="btn-delete">حذف</button>
                </div>
                <div className="singleBook">
                  <div xs={3}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg"
                      className="bookImg"

                      alt=""
                    />
                  </div>
                  <button className="btn-delete">حذف</button>
                </div>
                <div className="singleBook">
                  <div xs={3}>
                    <img
                      src="http://www.4read.net/uploads/images/1480158996.jpg"
                     className="bookImg"
                      alt=""
                    />
                  </div>
                  <button className="btn-delete">حذف</button>
                </div>
                <div className="singleBook">
                  <div xs={3}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/Garnada_trilogy.jpg/220px-Garnada_trilogy.jpg"
                      className="bookImg"

                      alt=""
                    />
                  </div>
                  <button className="btn-delete">حذف</button>
                </div>
            </div>
          </TabPanel>
          <TabPanel value="3"> العنصر الثالث</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}


export default BookTab;
