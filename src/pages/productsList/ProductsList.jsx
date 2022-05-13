import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import ProductsService from "../../services/ProductsService";
import ProductCard from "../../shared/productCard/ProductCard";

function ProductsList() {
  let [products, setProducts] = useState([]);
  let [filtroNombre, setFiltroNombre] = useState(null);

  //Begin component
  useEffect(() => {
    getAllProducts();
  }, []);

  //Trae todos los productos
  function getAllProducts(filter = null) {
    ProductsService.findAll(filter).then((data) => {
      setProducts(data.data);
    });
  }

  return (
    <Fragment>
      <div className="row">
        <div class="d-flex">
          <input
            class="form-control me-sm-2"
            type="text"
            placeholder="Ingrese un nombre de busqueda"
            onChange={(e) => {
              setFiltroNombre(e.target.value);
            }}
          />
          <button
            class="btn btn-secondary my-2 my-sm-0"
            onClick={() => {
              getAllProducts({ productName: filtroNombre });
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
      <div className="row">
        {products.map((product, index) => {
          return (
            <Fragment key={index}>
              <div className="col-10 col-xs-8 col-sm-6 col-md-4 col-lg-3 mx-0">
                <ProductCard product={JSON.stringify(product)} />
              </div>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
}

export default ProductsList;
