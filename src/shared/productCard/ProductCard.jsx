import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

function ProductCard(props) {
  let product = props.product ? JSON.parse(props.product) : {};

  return (
    <Fragment>
      <div className="card text-center my-3 rounded">
        <div
          className="
        card-header
        bg-dark
        text-white
        d-flex
        justify-content-between
        align-center
        rounded
      "
        >
          {product.productName}
          <button className="btn btn-danger rounded">
            <FontAwesomeIcon icon={faTrashCan} size="2x" />
          </button>
        </div>
        <img className="card-img-top" src={logo} alt="img_card"></img>
        <div className="card-body">
          <p>
            <span className="font-weight-bold">Categoria:</span>{" "}
            {product.category.category}
          </p>
          <p>
            <span className="font-weight-bold">Cant. Inventario:</span>{" "}
            {product.unitsBuyes}
          </p>
          <p>
            <span className="font-weight-bold">Precio Final:</span> $
            {product.priceFinal}
          </p>
          <Link
            className="btn btn-info btn-block rounded"
            to={`/edit-product/${product.id}`}
          >
            <FontAwesomeIcon icon={faPencil} /> &nbsp; Editar Producto
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductCard;
