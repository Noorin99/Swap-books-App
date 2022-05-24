import React from "react";
import lonelyMolhem from "../../assets/images/lonelyMolhem.svg";
import "./style.css";

function Home() {
  return (
    <>
      <section className="section_1">
        <div className="title1">
          <span>
            ملهم وحيد يكتنز كتبه لنفسه و لا يشعر بأنس مجالستها ولكن عجباً فخير
            جليس في الزمان كتاب!
          </span>
          <img id="lonely_molhem" src={lonelyMolhem} alt="lonely molhem" />
        </div>
      </section>
    </>
  );
}

export default Home;
