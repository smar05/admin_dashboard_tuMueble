import {
  faBoxesStacked,
  faCouch,
  faPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {Collapse} from "bootstrap";

export default function Navbar({ user }) {
  //Referencia al menu desplegable de productos
  let productsDropdown = useRef();

  // //Referencia al menu desplgable del navbar
  // let navbarDropdown = useRef();

  // //Begin component
  // useEffect(() => {
  //   //El menu se inicializa cerrado
  //   productsDropdown.current.style.display = "none";
  // }, []);

  /**
   * Function for display or close a htm item
   *
   * @param {useRef} itemRef html item for display
   * @return {boolean} if the item was open or close
   */
  // function showItem(itemRef) {
  //   //Despliega el menu
  //   if (itemRef.current.style.display === "none") {
  //     itemRef.current.style.display = "block";
  //     return true;
  //   }
  //   //Oculta el menu
  //   itemRef.current.style.display = "none";
  //   return false;
  // }

  const [ toggle, setToggle] = useState(false);

  useEffect(()=>{
      const myCollapse=document.getElementById("navbarNav");
      const bsCollapse= new Collapse(myCollapse,{toggle:false});
      toggle ? bsCollapse.show() : bsCollapse.hide();
  });

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
            aria-expanded="false"
            onClick={() => {
              setToggle(toggle =>!toggle);
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            in={toggle}
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"></li>
              <li
                className="nav-item dropdown"
                onClick={() => {
                  // showItem(productsDropdown);
                }}
              >
                <div
                  className="nav-link dropdown-toggle show"
                  data-bs-toggle="dropdown"
                  href="/"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Productos
                </div>

                <div
                  className="dropdown-menu show"
                  data-bs-popper="none"
                  // ref={productsDropdown}
                >
                  <Link
                    className="dropdown-item"
                    aria-current="page"
                    to="/products-list"
                  >
                    <FontAwesomeIcon icon={faBoxesStacked} size="lg" /> &nbsp;
                    Ver todos
                  </Link>
                  <Link
                    className="dropdown-item"
                    aria-current="page"
                    to="/create-product"
                  >
                    <FontAwesomeIcon icon={faPlus} size="lg" /> &nbsp; Crear
                  </Link>
                </div>
              </li>

              {!user ? (
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} size="lg" /> &nbsp;
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link rounded-circle"
                    aria-current="page"
                    to="/login"
                  >
                    <FontAwesomeIcon icon={faCircleUser} size="xl" /> &nbsp;{" "}
                    {user.firstName}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
