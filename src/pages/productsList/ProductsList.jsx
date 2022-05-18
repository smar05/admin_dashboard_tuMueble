import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductsService from "../../services/ProductsService";
import ProductCard from "../../shared/productCard/ProductCard";

function ProductsList() {
  let [products, setProducts] = useState([]);
  let location = useLocation();

  //Begin component
  useEffect(() => {
    getAllProductsByQueryString();
  }, []);

  useEffect(() => {
    getAllProductsByQueryString();
  }, [location.search]);

  function getAllProductsByQueryString() {
    let filterUrl = null;
    if (location.search) {
      filterUrl = location.search;
    }
    getAllProducts(filterUrl);
  }

  //Trae todos los productos
  function getAllProducts(filter = null) {
    ProductsService.findAll(filter)
      .then((data) => {
        if (data.status === 404) {
          console.log("algo");
          setProducts(null);
        }
        setProducts(data.data);
      })
      .catch((error) => {
        setProducts(null);
      });
  }

  return (
    <Fragment>
      <div className="row">
        {products && products.length > 0
          ? products.map((product, index) => {
              return (
                <Fragment key={index}>
                  <div className="col-10 col-xs-8 col-sm-6 col-md-4 col-lg-3 mx-0">
                    <ProductCard product={JSON.stringify(product)} />
                  </div>
                </Fragment>
              );
            })
          : () => {
              return (
                <Fragment>
                  <h1>No se encontraron productos</h1>
                </Fragment>
              );
            }}
      </div>
    </Fragment>
  );
}

export default ProductsList;
