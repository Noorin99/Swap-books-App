import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Flow() {
  const { id } = useSelector((state) => state.User);
  const [open, setOpen] = useState(true);
  return open ? (
    <div onClick={() => setOpen(!open)} className="flow_circle">
      ?
    </div>
  ) : (
    <div className="bowl_pop_flow">
      <Link onClick={() => setOpen(!open)} className="line_Flow" to="/books">
        البحث عن كتاب
      </Link>
      <Link onClick={() => setOpen(!open)} className="line_Flow" to={id ? "/AddBook" : "/login"}>
        اعطاء كتاب
      </Link>
      <button onClick={() => setOpen(!open)} className="line_Flow btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <path
              d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
              data-name="close"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}

export default Flow;
