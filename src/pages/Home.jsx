import { ReactComponent as LonelyMolhem } from "../assets/images/lonelyMolhem.svg";
import { ReactComponent as ArrowDown } from "../assets/icons/arrowDown.svg";

function Home() {
  return (
    <>
      <section className="section_home ">
        <div className="top_head_s1">
          <div className="title_s1_home">
            <span>
              <span className="boros">ملهم</span> وحيد يكتنز كتبه لنفسه و لا
              يشعر بأنس مجالستها ولكن عجباً فخير جليس في الزمان كتاب!
            </span>

            <div className="lines_s1">
              <div className="line_s1 l1"></div>
              <div className="line_s1 l2"></div>
              <div className="line_s1 l3"></div>
              <div className="line_s1 l4"></div>
            </div>
          </div>

          <div className="cover_s1_home">
            <LonelyMolhem />
          </div>
        </div>

        <div className="go_crolling">
          <div className="content_scroll_down">
            <span>أكمل المشاهدة</span>
            <ArrowDown />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
