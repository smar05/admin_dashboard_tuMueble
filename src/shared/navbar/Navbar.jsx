import {
  faBoxesStacked,
  faCouch,
  faPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Navbar() {
  //Referencia al menu desplegable de productos
  let productsDropdown = useRef();

  //Begin component
  useEffect(() => {
    //El menu se inicializa cerrado
    productsDropdown.current.style.display = "none";
  }, []);

  /**
   * Function for display or close a htm item
   *
   * @param {useRef} itemRef html item for display
   * @return {boolean} if the item was open or close
   */
  function showProductsMenu(itemRef) {
    //Despliega el menu
    if (itemRef.current.style.display === "none") {
      itemRef.current.style.display = "block";
      return true;
    }
    //Oculta el menu
    itemRef.current.style.display = "none";
    return false;
  }

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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"></li>
              <li
                className="nav-item dropdown"
                onClick={() => {
                  showProductsMenu(productsDropdown);
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
                  ref={productsDropdown}
                >
                  <Link
                    className="dropdown-item"
                    aria-current="page"
                    to="/products-list"
                  >
                    <FontAwesomeIcon icon={faBoxesStacked} /> &nbsp; Ver
                    Productos
                  </Link>
                  <Link
                    className="dropdown-item"
                    aria-current="page"
                    to="/create-product"
                  >
                    <FontAwesomeIcon icon={faPlus} /> &nbsp; Crear Producto
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
