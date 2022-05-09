import "./style.css";
import logo from "./Logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="header">
      <Link component={Link} to="/">
        <img id="logo" src={logo} alt="molhem logo" />
      </Link>
      <div className="links">
        <Link className="header_elements" component={Link} to="/">
          <span>الصفحة الرئيسية</span>
        </Link>
        <Link className="header_elements" component={Link} to="/">
          <span>أعط كتاب</span>
        </Link>
        <Link className="header_elements" component={Link} to="/">
          <span>ابحث عن كتب</span>
        </Link>
        <Link className="header_elements" component={Link} to="/">
          <span>من نحن؟</span>
        </Link>
        <Link className="header_elements" component={Link} to="/">
          <span>سجل دخول</span>
        </Link>
      </div>
      <div className="register_button">
        <button className="leaf"></button>
        <span className="leaf_inside">أنشئ حساب</span>
      </div>
    </section>
  );
};

export default Header;
