import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/icons/Logo.svg";

function Footer() {
  return (
    <footer>
      <Link to="">
        <Logo />
      </Link>
      <div className="menu_ffoter">
        <Link to="">من نحن؟</Link>
        <Link to="">تجربتك مع ملهم</Link>
        <Link to="">كيف أستخدم التطبيق؟</Link>
        <Link to="">الشروط والقوانين</Link>
      </div>

      <div className="all_rights">
        <span>© جميع الحقوق محفوظة 2022 </span>
      </div>
    </footer>
  );
}

export default Footer;
