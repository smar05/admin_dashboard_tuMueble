import {
  faBoxesStacked,
  faCouch,
  faPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Navbar() {

  const { open, setOpen } = useState(false);

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark py-2 shadow">
        <div className="container-fluid">
          <Link className="navbar-brand text-white-50" to="/">
            <FontAwesomeIcon icon={faCouch} className="" />
            <span className="mx-3">|</span>
            TuMueble
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNav"
            aria-label="Toggle navigation"
            onClick={()=> setOpen(!open) }
            aria-expanded={open}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Collapse
            className="align-items-center"
            in={open}
            id="navbarNav"
          >
            <ul className="navbar-nav ml-auto align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/create-product"
                >
                  <FontAwesomeIcon icon={faPlus} size="lg" />
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/products-list"
                >
                  <FontAwesomeIcon icon={faBoxesStacked} size="lg" />
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link mx-1" to="/login">
                  <FontAwesomeIcon icon={faSignInAlt} size="lg" />
                </Link>
              </li>
            </ul>
          </Collapse>
        </div>
      </nav>
    </header>
  );
}
