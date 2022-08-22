import React, { useEffect, useState } from "react";
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
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";
import { useDispatch } from "react-redux";
import { setUserStore } from "./stores/User";
import { doc, getDoc } from "firebase/firestore";
import "./styles";
import Flow from "./components/Flow";

function App() {
  const [logged, setLogged] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(store, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let { avatar, city, description, fname, instagram, facebook, twitter } = docSnap.data();
          setLogged(true);
          if (avatar && description && city && fname && (instagram || facebook || twitter)) {
            dispatch(setUserStore({ id: user.uid, ...docSnap.data(), profile: true }));
            // console.log("profile completed");
          } else {
            dispatch(setUserStore({ id: user.uid, ...docSnap.data(), profile: false }));
            // console.log("profile not completed");
          }
        }
      } else {
        console.log("not logged");
      }
    });
    return checkAuth;
  }, []);

  return (
    <Router>
      <Flow />
      <Nav />
      <main>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book/:id" element={<Book />} />
          {logged && <Route path="/profile" element={<Profile />} />}
          {logged && <Route path="/addbook" element={<AddBook />} />}
          <Route path="/profile/:id" element={<ProfileDemo />} />
          <Route path="/verifyemail" element={<EmailVerification />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
