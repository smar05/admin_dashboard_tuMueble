import React, { Fragment } from "react";
import ProductCard from "../../shared/productCart/ProductCard";

function ProductsList() {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-4">
          <ProductCard />
        </div>
      </div>
    </Fragment>
  );
}

export default ProductsList;
