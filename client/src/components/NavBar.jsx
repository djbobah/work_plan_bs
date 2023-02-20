import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        <Link className="navbar-brand" to="/">
          <div className={styles.logo}>
            <img src={logo} width="50" height="50" alt="logo" />
            <span>
              ПЛАН <br /> РАБОТ
            </span>
          </div>
        </Link>
        <div className={styles["nav-body"]}>
          {localStorage.getItem("name_sl")}
        </div>
        <div>
          {localStorage.getItem("id_sl") === "16-а00135" ? (
            <Link
              className="dropdown-item"
              to="/auto"
              // onClick={toggleMenuIsOpen}
            >
              {" "}
              <button className="btn btn-secondary border">
                {" "}
                Управление
                <br /> базой
                <br />
                автомобилей
              </button>{" "}
            </Link>
          ) : (
            ""
          )}
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0 ">
              <li className="nav-item dropdown  ">
                <Link
                  className={`nav-link dropdown-toggle fs-6 ${styles.actions}`}
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  onClick={toggleMenuIsOpen}
                >
                  Options
                </Link>
                <ul
                  className={`dropdown-menu  ${
                    menuIsOpen ? "show" : ""
                  } dropdown-menu-right`} //show
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item "
                      to="/"
                      onClick={toggleMenuIsOpen}
                    >
                      План работ
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/auto"
                      onClick={toggleMenuIsOpen}
                    >
                      Auto
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard"
                      onClick={toggleMenuIsOpen}
                    >
                      Admin panel
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
