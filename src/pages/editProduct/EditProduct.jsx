import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../logo.svg";
import TaxesService from "../../services/TaxesService";
import ProductCategoryService from "../../services/ProductCategoryService";
import ProductsService from "../../services/ProductsService";

const EditProduct = () => {
  let { id } = useParams();
  let [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    sku: "",
    productTerminated: "",
    category: {},
    isActive: false,
    priceGross: 0,
    taxes: [],
    discount: 0,
    priceFinal: 0,
    unitsBuyes: 0,
  });
  let [productCategories, setProductCategories] = useState([]);
  let [taxes, setTaxes] = useState([]);

  //Type of field data
  const TYPE_FIELDS = {
    number: "number",
    json: "json",
  };

  //Begin component
  useEffect(() => {
    getProductData();
    getAllProductCategoryData();
    getTaxesData();
  }, []);

  //Calculo del precio final
  useEffect(() => {
    let taxesSum = 0;
    if (product.taxes && product.taxes.length > 0) {
      for (let tax of product.taxes) {
        taxesSum += tax.taxeValue;
      }

      let priceFinal =
        Math.round(
          product.priceGross *
            (1 - product.discount / 100) *
            (1 + taxesSum / 100) *
            100
        ) / 100;
      setProduct({ ...product, priceFinal });
    }
  }, [product.priceGross, product.discount, product.taxes]);

  //Get product data
  function getProductData() {
    if (!id) {
      setProduct({});
      return null;
    }
    ProductsService.findOne(id).then((data) => {
      setProduct(data.data);
    });
  }

  //Get product categories
  function getAllProductCategoryData() {
    ProductCategoryService.findAll().then((data) => {
      setProductCategories(data.data);
    });
  }

  //Get Taxes
  function getTaxesData() {
    TaxesService.findAll().then((data) => {
      setTaxes(data.data);
    });
  }

  /**
   * On change function for update a field of the product
   *
   * @param {string} field Product field to update
   * @param {*} value Value of the field
   * @param {string} type Type of the data
   */
  function onChangeProductData(field, value, type = null) {
    if (type === TYPE_FIELDS.number) {
      value = Number(value);
    } else if (type === TYPE_FIELDS.json) {
      value = JSON.parse(value);
    }
    setProduct({
      ...product,
      [field]: value,
    });
  }

  return (
    <Fragment>
      <div className="row text-center offset-md-2">
        <h1>Crear Producto</h1>
      </div>
      {/**Visualizacion del producto */}
      {id ? (
        <Fragment>
          <div className="row">
            <div className="col-md-6 offset-md-3 mb-3">
              <div className="card card-body text-center">
                <h3 className="font-weight-bold">{product.productName} </h3>
                <img src={logo} alt="mainImage" />
                <p>
                  <span className="font-weight-bold">Descripción: </span>
                  <br />
                  {product.productDescription}
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <span className="font-weight-bold">SKU: </span>
                      <br />
                      {product.sku}
                    </p>
                    <p>
                      <span className="font-weight-bold">Terminado: </span>
                      <br />
                      {product.productTerminated}
                    </p>
                    <p>
                      <span className="font-weight-bold">Categoria: </span>
                      <br />
                      {product.category ? product.category.category : ""}
                    </p>
                    <p>
                      <span className="font-weight-bold">
                        Cant. Inventario:
                      </span>
                      <br />
                      {product.unitsBuyes}
                    </p>
                    <p>
                      <span className="font-weight-bold">
                        Unidades Vendidas:
                      </span>
                      <br />
                      {product.unitsSelled}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <span className="font-weight-bold">Precio Bruto: </span>
                      <br />${product.priceGross}
                    </p>
                    <p>
                      <span className="font-weight-bold">Impuesto: </span>
                      <br />
                      {product.taxes && product.taxes.length > 0
                        ? product.taxes.map((tax, index) => {
                            return (
                              <Fragment key={index}>
                                {tax.taxeName}: {tax.taxeValue}%
                                <br />
                              </Fragment>
                            );
                          })
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-weight-bold">Descuento: </span>
                      <br />
                      {product.discount}%
                    </p>
                    <p>
                      <span className="font-weight-bold">Precio Final: </span>
                      <br />${product.priceFinal}
                    </p>
                    <p>
                      <span className="font-weight-bold">Activo: </span>
                      <br />
                      {product.isActive ? (
                        <Fragment>
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            color="#4BB543"
                          />
                        </Fragment>
                      ) : (
                        <Fragment>
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            color="#BB2124"
                          />
                        </Fragment>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
      <form>
        <div className="row">
          <div className="col-md-4 offset-md-2 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="form-group">
                  <label
                    for="productName"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Nombre"
                    className="form-control"
                    autoFocus
                    id="productName"
                    value={product.productName}
                    onChange={(e) => {
                      onChangeProductData("productName", e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    for="productDescription"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Descripción
                  </label>
                  <textarea
                    type="text"
                    name="productDescription"
                    placeholder="Descripción"
                    className="form-control"
                    id="productDescription"
                    value={product.productDescription}
                    onChange={(e) => {
                      onChangeProductData("productDescription", e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label for="sku" className="form-label mt-4 font-weight-bold">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    placeholder="Sku"
                    className="form-control"
                    id="sku"
                    value={product.sku}
                    onChange={(e) => {
                      onChangeProductData("sku", e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    for="productTerminated"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Terminado
                  </label>
                  <input
                    type="text"
                    name="productTerminated"
                    placeholder="Terminado"
                    className="form-control"
                    id="productTerminated"
                    value={product.productTerminated}
                    onChange={(e) => {
                      onChangeProductData("productTerminated", e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    for="categoryId"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Categoria
                  </label>
                  <select
                    name="categoryId"
                    className="form-control"
                    value={JSON.stringify(product.category)}
                    onSelect
                    onChange={(e) => {
                      onChangeProductData(
                        "category",
                        e.target.value,
                        TYPE_FIELDS.json
                      );
                    }}
                  >
                    <option value="" disabled selected></option>
                    {productCategories.map((category, index) => {
                      return (
                        <Fragment key={index}>
                          <option value={JSON.stringify(category)}>
                            {category.category}
                          </option>
                        </Fragment>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label
                    for="mainImage"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Imagen principal
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="mainImage"
                    name="mainImage"
                  />
                </div>
                <fieldset className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="isActive"
                      id="isActive"
                      checked={product.isActive}
                      onChange={(e) => {
                        onChangeProductData("isActive", e.target.checked);
                      }}
                    />
                    <label
                      className="form-check-label font-weight-bold"
                      for="isActive"
                    >
                      ¿Activo?
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="form-group">
                  <label
                    for="priceGross"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Precio Bruto
                  </label>
                  <div class="input-group mb-3">
                    <span class="input-group-text">$</span>
                    <input
                      type="number"
                      name="priceGross"
                      placeholder="Precio Bruto"
                      className="form-control"
                      id="priceGross"
                      value={product.priceGross}
                      onChange={(e) => {
                        onChangeProductData(
                          "priceGross",
                          e.target.value,
                          TYPE_FIELDS.number
                        );
                      }}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="taxes" class="form-label mt-4">
                    Impuestos
                  </label>
                  <select
                    multiple={true}
                    class="form-control"
                    id="taxes"
                    name="taxes"
                    onChange={(e) => {
                      let options = e.target.options;
                      let value = [];
                      for (var i = 0, l = options.length; i < l; i++) {
                        if (options[i].selected && options[i].value === "") {
                          value = null;
                          break;
                        } else if (options[i].selected) {
                          value.push(JSON.parse(options[i].value));
                        }
                      }
                      onChangeProductData("taxes", value);
                    }}
                  >
                    <option value="">N/A</option>
                    {taxes.map((tax, index) => {
                      return (
                        <Fragment key={index}>
                          <option value={JSON.stringify(tax)}>
                            {tax.taxeName}: {tax.taxeValue}%
                          </option>
                        </Fragment>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <fieldset>
                    <label
                      className="form-label mt-4 font-weight-bold"
                      for="discount"
                    >
                      Descuento
                    </label>
                    <div class="input-group mb-3">
                      <input
                        id="discount"
                        className="form-control"
                        type="number"
                        name="discount"
                        placeholder="Descuento"
                        value={product.discount}
                        onChange={(e) => {
                          onChangeProductData(
                            "discount",
                            e.target.value,
                            TYPE_FIELDS.number
                          );
                        }}
                      />
                      <span class="input-group-text">%</span>
                    </div>
                  </fieldset>
                </div>
                <div className="form-group">
                  <label
                    for="priceFinal"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Precio Final
                  </label>
                  <div class="input-group mb-3">
                    <span class="input-group-text">$</span>
                    <input
                      type="number"
                      name="priceFinal"
                      placeholder="Precio Final"
                      className="form-control"
                      id="priceFinal"
                      value={product.priceFinal}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    for="unitsBuyes"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Cant. Inventario
                  </label>
                  <input
                    type="number"
                    name="unitsBuyes"
                    placeholder="Cant. Inventario"
                    className="form-control"
                    id="unitsBuyes"
                    value={product.unitsBuyes}
                    onChange={(e) => {
                      onChangeProductData(
                        "unitsBuyes",
                        e.target.value,
                        TYPE_FIELDS.number
                      );
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-success btn-block">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default EditProduct;
