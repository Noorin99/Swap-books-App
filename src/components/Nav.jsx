import Logo from "../assets/icons/Logo.svg";
import flowernav from "../assets/icons/flowernav.svg";
import { Link } from "react-router-dom";
import { ReactComponent as Backmenuflow } from "../assets/icons/backmenuflow.svg";
import { ReactComponent as Menu } from "../assets/icons/menu.svg";

function Nav() {
  return (
    <nav>
      <Link to="/" className="molhem_logo">
        <img id="logo" src={Logo} alt="molhem logo" />
        <div>
          <span>ملهــم </span>
        </div>
      </Link>
      <div className="menu">
        <Link className="header_elements" to="/">
          <span>الصفحة الرئيسية</span>
        </Link>
        <Link className="header_elements" to="/">
          <span>أعط كتاب</span>
        </Link>
        <Link className="header_elements" to="/">
          <span>ابحث عن كتب</span>
        </Link>
        <Link className="header_elements" to="/">
          <span>من نحن؟</span>
        </Link>
        <Link className="header_elements" to="/login">
          <span>سجل دخول</span>
        </Link>
      </div>
      <Link to="/" className="register_button">
        <img id="logo" src={flowernav} alt="molhem logo" />
        <div className="cewnter_title_register">
          <span>أنشئ حساب</span>
        </div>
      </Link>

      <div className="flow_menu">
        <Backmenuflow />
        <div className="title_menu_flow">
          <span>القائمة</span>
          <Menu />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
