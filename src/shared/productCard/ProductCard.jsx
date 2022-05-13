import {
  faCircleCheck,
  faCircleXmark,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Alerts } from "../../common/Alerts";
import { URL_IMAGES_PRODUCTS } from "../../common/ConstData";
import ProductsService from "../../services/ProductsService.js";

function ProductCard(props) {
  let product = props.product ? JSON.parse(props.product) : {};

  function eliminarProducto(idProduct) {
    Alerts.confirmAlert(
      "¿Esta seguro de eliminar este producto?",
      "Este proceso no se podra retornar",
      "warning",
      "Si"
    ).then((result) => {
      if (result.isConfirmed) {
        ProductsService.delete(idProduct)
          .then((res) => {
            Alerts.basicAlert("Producto eliminado", "");
          })
          .catch((error) => {
            Alerts.basicAlert("Ha ocurrido un error", "");
          });
      }
    });
  }

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
          <button
            className="btn btn-danger rounded"
            onClick={() => {
              eliminarProducto(product.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} size="2x" />
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
          <p>
            <span className="font-weight-bold">Activo: </span>

            {product.isActive ? (
              <Fragment>
                <FontAwesomeIcon icon={faCircleCheck} color="#4BB543" />
              </Fragment>
            ) : (
              <Fragment>
                <FontAwesomeIcon icon={faCircleXmark} color="#BB2124" />
              </Fragment>
            )}
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
