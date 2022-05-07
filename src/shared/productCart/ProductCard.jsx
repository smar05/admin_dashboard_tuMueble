import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

function ProductCard() {
  return (
    <Fragment>
      <div className="card text-center">
        <div
          className="
        card-header
        bg-dark
        text-white
        d-flex
        justify-content-between
        align-center
      "
        >
          <span className="font-weight-bold">Nombre:</span> Nombre producto
          <button className="btn btn-danger">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
        <img className="card-img-top" src={logo} alt="img_card"></img>
        <div className="card-body">
          <p>
            <span className="font-weight-bold">Categoria:</span> Categoria
            producto
          </p>
          <p>
            <span className="font-weight-bold">Cant. Inventario:</span> 10
          </p>
          <p>
            <span className="font-weight-bold">Precio Final:</span> $100.000
          </p>
          <p>
            <span className="font-weight-bold">Descuento:</span> %10
          </p>
          <Link className="btn btn-info btn-block" to="/edit-product">
            <FontAwesomeIcon icon={faPencil} /> &nbsp; Editar Producto
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductCard;
