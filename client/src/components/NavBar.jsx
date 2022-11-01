import React, { useState } from "react";
import logo from "../static/img/doc2.png";

// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "./NavBar.module.css";
// import NavCheckButton from "./NavCheckButton";
const NavBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenuIsOpen = () => {
    setMenuIsOpen(!menuIsOpen);
  };
  return (
    <nav
      // className="navbar  navbar-light bg-light"
      className={`navbar navbar-expand-lg  ${styles.nav}`}
      fixed="top"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <div className={styles.logo}>
            <img src={logo} width="50" height="50" alt="logo" />
            <span>
              ПЛАН <br /> РАБОТ
            </span>
          </div>
        </a>
        <div className={styles["nav-body"]}>
          Линейно-эксплуатационная служба
        </div>
        <div className={styles.actions}>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                {/* ${menuIsOpen ? "show" : ""} */}
                <a
                  className={`nav-link dropdown-toggle  ${styles.actions}`}
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  dataToggle="dropdown"
                  ariaExpanded="false"
                  onClick={toggleMenuIsOpen}
                >
                  Dropdown
                </a>
                <ul
                  className={`dropdown-menu  ${
                    menuIsOpen ? "show" : ""
                  } dropdown-menu-right dropdown-menu-lg-left`} //show
                  ariaLabelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
