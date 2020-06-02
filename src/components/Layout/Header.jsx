import React, { Component } from "react";
import SideDrawer from "./SideDrawer";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="" style={{ position: `relative` }}>
        <SideDrawer side="right" links={this.props.links} history={this.props.history} />
        <a
          href="/"
          onClick={e=> e.preventDefault()}
          style={{
            position: `absolute`,
            marginTop: `30px`,
            right: `20px`,
            zIndex: 100,
          }}
          data-target="slide-out"
          className="sidenav-trigger white-text"
        >
          <i className="material-icons">menu</i>
        </a>
        <nav style={{padding: `20px 0`,boxSizing: `content-box`,backgroundColor: `#2998ff`}}>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left" style={{ marginLeft: `50px` }}>
            Social Feed
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
