import React, { Fragment, useEffect, useState } from "react";
import ProductsService from "../../services/ProductsService";
import ProductCard from "../../shared/productCard/ProductCard";

function ProductsList() {
  let [products, setProducts] = useState([]);

  //Begin component
  useEffect(() => {
    getAllProducts();
  }, []);

  //Trae todos los productos
  function getAllProducts() {
    ProductsService.findAll().then((data) => {
      setProducts(data.data);
    });
  }

  return (
    <Fragment>
      <div className="row">
        {products.map((product, index) => {
          return (
            <Fragment key={index}>
              <div className="col-md-4">
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
