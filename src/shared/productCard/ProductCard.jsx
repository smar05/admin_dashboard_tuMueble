import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { URL_IMAGES_PRODUCTS } from "../../common/ConstData";

function ProductCard(props) {
  let product = props.product ? JSON.parse(props.product) : {};

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
          {product.productName}
          <button className="btn btn-danger">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
        <img
          className="card-img-top"
          src={`${
            URL_IMAGES_PRODUCTS +
            (product.images
              ? product.images.find((image) => image.isMain).pathImagen
              : "")
          }`}
          alt="img_card"
        ></img>
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
            className="btn btn-info btn-block"
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
