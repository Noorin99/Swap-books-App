import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { auth, store } from "./firebase/config";
import AddBook from "./pages/AddBook";
import Book from "./pages/Book";
import Books from "./pages/Books";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";
import ProfileDemo from "./pages/ProfileDemo";
import Signup from "./pages/Signup";
import "./styles";
import { useDispatch } from "react-redux";
import { setUserStore } from "./stores/User";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(" logged ", user.uid);
        const docRef = doc(store, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(setUserStore({ id: user.uid, ...docSnap.data() }));
        }
      } else {
        console.log("not logged");
      }
    });
    return checkAuth;
  }, []);

  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<ProfileDemo />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
