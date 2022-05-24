import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nav, Footer } from "./components";
import {
  Home,
  Books,
  Login,
  Signup,
  Book,
  Profile,
  ProfileDemo,
  AddBook,
  EditProfile,
} from "./pages";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ProfileDemo />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
