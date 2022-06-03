import { ReactComponent as LonelyMolhem } from "../assets/images/lonelyMolhem.svg";
import { ReactComponent as ArrowDown } from "../assets/icons/arrowDown.svg";
import { ReactComponent as GroupThree } from "../assets/icons/GroupThree.svg";
import { ReactComponent as Loopthink } from "../assets/icons/loopthink.svg";
import { ReactComponent as Circlethink } from "../assets/icons/circlethink.svg";
import { ReactComponent as Wave1 } from "../assets/icons/wave1.svg";
import { ReactComponent as Givebook } from "../assets/icons/givebook.svg";
import { ReactComponent as Hands } from "../assets/icons/hands.svg";
import { ReactComponent as Groupfriends } from "../assets/icons/groupfriends.svg";
import { ReactComponent as Backthree } from "../assets/icons/backthree.svg";
import { useParallax } from "react-scroll-parallax";

function Home() {
  const GoNextSection = ({ go }) => {
    return (
      <div className="go_crolling">
        <a href={go}>
          <div className="content_scroll_down">
            <span>أكمل المشاهدة</span>
            <ArrowDown />
          </div>
        </a>
      </div>
    );
  };
  return (
    <>
      {/* section 1 */}
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
        <GoNextSection go="#sec_2" />
      </section>

      {/* section 2 */}
      <section id="sec_2" className="section_home ">
        <div className="top_head_s1">
          <div className="title_s1_home">
            <span>
              حتى أن نبات أفكاره ما عادت تنمو كما عهد، فجلس يفكّر وحيداً
            </span>

            <div className="group_s2">
              <GroupThree />
            </div>
          </div>

          <div className="cover_s2_home">
            <div className="top_thinks_circle">
              <Circlethink />
              <Circlethink />
              <Circlethink />
            </div>

            <Loopthink className="man_who_thinking" />

            <Wave1 className="wave_ wave_1" />
            <Wave1 className="wave_ wave_2" />
            <Wave1 className="wave_ wave_3" />
            <Wave1 className="wave_ wave_4" />
          </div>
        </div>

        <GoNextSection go="#sec_3" />
      </section>

      {/* section 3 */}

      <section id="sec_3" className="section_home ">
        <div className="content_section_3">
          <div className="bowl_hands">
            <Hands />
          </div>

          <div className="btn_give_book_s3">
            <button>اعط كتابا واعثر على صديق</button>
          </div>

          <div className="cover_give_book_s3">
            <Givebook />
          </div>
        </div>
        <GoNextSection go="#sec_4" />
      </section>

      <section id="sec_4" className="section_4">
        <div className="title_s4">
          <span>
            وجد <span className="greendetd">ملهم</span> أن السعادة تكمن في
            مشاركة الآخرين وتبادل المنفعة فالشجرة إن لم تلقِ حملها وبذورها
            لاندثرت وما بقيت، لتكن أنت ملهماً أيضاً وشاركنا تجربة العطاء فخير
            الناس أنفعهم للناس
          </span>
        </div>
        <div className="btn_give_book_s3">
          <button>اعط كتابا واعثر على صديق</button>
        </div>
        <div className="draws">
          <Groupfriends className="advicegroup_s4" />
          <Backthree className="back_threes" />
        </div>
      </section>
    </>
  );
}

export default Home;
