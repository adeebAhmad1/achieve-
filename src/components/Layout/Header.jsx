import React, { Component } from "react";
import SideDrawer from "./SideDrawer";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="" style={{ position: `relative` }}>
        <SideDrawer side="right" links={this.props.links} history={this.props.history} />
        <a
          href="#"
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
        <nav className="green" style={{padding: `20px 0`,boxSizing: `content-box`}}>
          <div class="nav-wrapper">
            <Link to="/" class="brand-logo" style={{ marginLeft: `50px` }}>
            Acheve Church  Plus
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
