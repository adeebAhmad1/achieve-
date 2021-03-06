import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  const showLinks = ()=>{
    return props.links.map((el,i)=>{
      return <li key={i}><Link className="grey-text text-lighten-3" to={el.link}>{el.text}</Link></li>
    })
  }
  return (
    <footer className="page-footer" style={{backgroundColor: `#2998ff`}}>
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Social Feed</h5>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  {showLinks()}
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright center"style={{backgroundColor: `#11aaff`}}>
            <div className="container">
            © {new Date().getFullYear()} All rights reserved
            </div>
          </div>
        </footer>
  );
};

export default Footer;