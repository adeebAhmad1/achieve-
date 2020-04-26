import React, { useEffect, useState } from "react";
import { Sidenav } from "materialize-css";
import { Link } from "react-router-dom";
const SideDrawer = (props) => {
  const [instance, setInstance] = useState(null)
  useEffect(() => {
    const options = { edge: props.side };
    Sidenav.init(document.querySelectorAll(".sidenav"), options);
    const instance = Sidenav.getInstance(document.querySelector(".sidenav"));
    setInstance(instance)
  }, []);
  const showLinks = () => {
    return props.links.map((el) => {
      return (
        <li>
          <Link
            to="/"
            className="waves-effect"
            onClick={(e) => {
              e.preventDefault();
              console.log()
              instance.close();
              setTimeout(() => {
                props.history.push(el.link)
              }, 700);
            }}
          >
            {el.text}
          </Link>
        </li>
      );
    });
  };
  return (
    <ul id="slide-out" className="sidenav" style={{width: `400px`}}>
      <li><Link to="" onClick={(e)=> e.preventDefault()} className="waves-effect" style={{fontSize: `2rem`,height: `5rem`,paddingTop: `10px`}}>Acheve Church+</Link></li>
      {showLinks()}
    </ul>
  );
};

export default SideDrawer;
