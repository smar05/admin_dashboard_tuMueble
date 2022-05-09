import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TaxesService from "../../services/TaxesService";
import ProductCategoryService from "../../services/ProductCategoryService";
import ProductsService from "../../services/ProductsService";
import { useLocation } from "react-router-dom";
import { URL_IMAGES_PRODUCTS } from "../../common/ConstData";

const EditProduct = () => {
  const location = useLocation();
  let [componentTitle, setComponentTitle] = useState("Crear Producto");
  let initProduct = {
    productName: null,
    productDescription: null,
    sku: null,
    productTerminated: null,
    category: null,
    isActive: false,
    priceGross: null,
    taxes: [],
    discount: null,
    priceFinal: null,
    unitsBuyes: null,
  };

  let { id } = useParams();
  let [product, setProduct] = useState(initProduct);
  let [productCategories, setProductCategories] = useState([]);
  let [taxes, setTaxes] = useState([]);
  let [formValidation, setFormValidation] = useState(true); //Validacion del formulario
  let formInputs = {
    productName: {
      group: useRef(),
      input: useRef(),
      message: useRef(),
    },
    productDescription: {
      group: useRef(),
      input: useRef(),
      message: useRef(),
    },
    productTerminated: {
      group: useRef(),
      input: useRef(),
      message: useRef(),
    },
    category: {
      group: useRef(),
      input: useRef(),
      message: useRef(),
    },
    priceGross: {
      group: useRef(),
      input: useRef(),
      message: useRef(),
    },
    discount: {
      group: useRef(),
      input: useRef(),
      message: useRef(),
    },
    unitsBuyes: {
      group: useRef(),
      input: useRef(),
      message: useRef(),
    },
    priceFinal: {
      group: useRef(),
      input: useRef(),
      message: useRef(),
    },
  };

  //Type of field data
  const TYPE_FIELDS = {
    number: "number",
    json: "json",
  };

  const VALIDATIONS_TYPES = {
    NotEmpty: "NotEmpty",
    Number: "Number",
    MaxLength: "MaxLength",
    MinLength: "MinLength",
    Max: "Max",
    Min: "Min",
  };

  //Begin component
  useEffect(() => {
    getProductData();
    getAllProductCategoryData();
    getTaxesData();
  }, []);

  //Location change
  useEffect(() => {
    if (location.pathname === "/create-product") {
      setProduct(initProduct);
    } else {
      setComponentTitle("Editar Producto");
    }
  }, [location]);

  //Calculo del precio final
  useEffect(() => {
    let taxesSum = 0;
    if (product.taxes && product.taxes.length > 0) {
      for (let tax of product.taxes) {
        taxesSum += Number(tax.taxeValue);
      }
    }
    let priceFinal =
      Math.round(
        product.priceGross *
          (1 - product.discount / 100) *
          (1 + taxesSum / 100) *
          100
      ) / 100;
    setProduct({ ...product, priceFinal });
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

  /**
   * Validation of form fields
   *
   * @param {*} value Value of the field
   * @param {string} field Name of the field
   * @param {[string]} validations Type of validation
   */
  function validationFormFields(value, field, validations) {
    let classGroup = formInputs[field].group.current.className;
    let classGroupData = classGroup.split(" ");
    let classInput = formInputs[field].input.current.className;
    let classInputData = classInput.split(" ");
    let cumple = true; //Si el campo cumple
    let mensajesError = [];

    for (const validation of validations) {
      //Campo vacio
      if (validation === VALIDATIONS_TYPES.NotEmpty) {
        if (!value) {
          cumple = false;
          mensajesError.push("El campo no puede estar vacio.");
        }
      }
      //Campo tamaño minimo
      if (validation[0] === VALIDATIONS_TYPES.MinLength) {
        if (value && value.length < validation[1]) {
          cumple = false;
          mensajesError.push(
            `El campo no puede tener menos de ${validation[1]} caracteres.`
          );
        }
      }
      //Campo tamaño maximo
      if (validation[0] === VALIDATIONS_TYPES.MaxLength) {
        if (value && value.length > validation[1]) {
          cumple = false;
          mensajesError.push(
            `El campo no puede tener mas de ${validation[1]} caracteres.`
          );
        }
      }
      //Tipo numerico
      if (validation === VALIDATIONS_TYPES.Number) {
        if (Number(value) == NaN) {
          cumple = false;
          mensajesError.push("El campo tiene que ser numerico");
        }
      }
      if (validation[0] === VALIDATIONS_TYPES.Min) {
        if (Number(value) < validation[1]) {
          cumple = false;
          mensajesError.push(
            `El campo tiene que ser mayor que ${validation[1]}.`
          );
        }
      }
      if (validation[0] === VALIDATIONS_TYPES.Max) {
        if (Number(value) > validation[1]) {
          cumple = false;
          mensajesError.push(
            `El campo tiene que ser menor que ${validation[1]}.`
          );
        }
      }
    }

    formInputs[field].message.current.innerHTML = "";
    if (!cumple) {
      //Cumple la validacion
      //Si no tiene la clase has-danger
      if (classGroupData.indexOf("has-danger") < 0) {
        classGroupData.push("has-danger");
      }
      //Si no tiene la clase is-invalid
      if (classInputData.indexOf("is-invalid") < 0) {
        classInputData.push("is-invalid");
      }

      if (mensajesError.length > 0) {
        for (const mensajeError of mensajesError) {
          formInputs[field].message.current.innerHTML += `${mensajeError}<br/>`;
        }
      }
    } else {
      //Incumple la validacion
      //Si tiene la clase has-danger
      if (classGroupData.indexOf("has-danger") >= 0) {
        classGroupData.splice(classGroupData.indexOf("has-danger"), 1);
      }
      //Si tiene la clase is-invalid
      if (classInputData.indexOf("is-invalid") >= 0) {
        classInputData.splice(classInputData.indexOf("is-invalid"), 1);
      }
    }

    formInputs[field].group.current.className = classGroupData.join(" ");
    formInputs[field].input.current.className = classInputData.join(" ");

    setFormValidation(cumple);
  }

  return (
    <Fragment>
      <div className="row text-center offset-md-2">
        <h1>{componentTitle}</h1>
      </div>
      {/**Visualizacion del producto */}
      {id ? (
        <Fragment>
          <div className="row">
            <div className="col-md-6 offset-md-3 mb-3">
              <div className="card card-body text-center">
                <h3 className="font-weight-bold">{product.productName} </h3>
                <img
                  src={`${
                    URL_IMAGES_PRODUCTS +
                    (product.images
                      ? product.images.find((image) => image.isMain).pathImagen
                      : "")
                  }`}
                  alt="mainImage"
                />
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

      {/**Formulario */}
      <form>
        <div className="row">
          <div className="col-md-4 offset-md-2 mb-3">
            <div className="card">
              <div className="card-body">
                {/**productName */}
                <div className="form-group" ref={formInputs.productName.group}>
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
                      validationFormFields(e.target.value, "productName", [
                        VALIDATIONS_TYPES.NotEmpty,
                        [VALIDATIONS_TYPES.MinLength, 2],
                        [VALIDATIONS_TYPES.MaxLength, 128],
                      ]);
                    }}
                    ref={formInputs.productName.input}
                  />
                  <div
                    class="invalid-feedback"
                    ref={formInputs.productName.message}
                  ></div>
                </div>
                {/**productDescription */}
                <div
                  className="form-group"
                  ref={formInputs.productDescription.group}
                >
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
                    ref={formInputs.productDescription.input}
                    onChange={(e) => {
                      onChangeProductData("productDescription", e.target.value);
                      validationFormFields(
                        e.target.value,
                        "productDescription",
                        [
                          VALIDATIONS_TYPES.NotEmpty,
                          [VALIDATIONS_TYPES.MinLength, 2],
                          [VALIDATIONS_TYPES.MaxLength, 512],
                        ]
                      );
                    }}
                  ></textarea>
                  <div
                    class="invalid-feedback"
                    ref={formInputs.productDescription.message}
                  ></div>
                </div>
                {/**sku */}
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
                {/**productTerminated */}
                <div
                  className="form-group"
                  ref={formInputs.productTerminated.group}
                >
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
                    ref={formInputs.productTerminated.input}
                    onChange={(e) => {
                      onChangeProductData("productTerminated", e.target.value);
                      validationFormFields(
                        e.target.value,
                        "productTerminated",
                        [
                          VALIDATIONS_TYPES.NotEmpty,
                          [VALIDATIONS_TYPES.MinLength, 2],
                          [VALIDATIONS_TYPES.MaxLength, 64],
                        ]
                      );
                    }}
                  />
                  <div
                    class="invalid-feedback"
                    ref={formInputs.productTerminated.message}
                  ></div>
                </div>
                {/**category */}
                <div className="form-group" ref={formInputs.category.group}>
                  <label
                    for="categoryId"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Categoria
                  </label>
                  <select
                    name="categoryId"
                    className="form-control"
                    value={
                      product.category ? JSON.stringify(product.category) : null
                    }
                    ref={formInputs.category.input}
                    onChange={(e) => {
                      onChangeProductData(
                        "category",
                        e.target.value,
                        e.target.value ? TYPE_FIELDS.json : null
                      );
                      validationFormFields(e.target.value, "category", [
                        VALIDATIONS_TYPES.NotEmpty,
                      ]);
                    }}
                  >
                    <option value={null} disabled selected></option>
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
                  <div
                    class="invalid-feedback"
                    ref={formInputs.category.message}
                  ></div>
                </div>
                {/**mainImage */}
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
                {/**isActive */}
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
                {/**priceGross */}
                <div className="form-group" ref={formInputs.priceGross.group}>
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
                      ref={formInputs.priceGross.input}
                      onChange={(e) => {
                        onChangeProductData(
                          "priceGross",
                          e.target.value,
                          TYPE_FIELDS.number
                        );
                        validationFormFields(e.target.value, "priceGross", [
                          VALIDATIONS_TYPES.Number,
                          [VALIDATIONS_TYPES.Min, 0],
                        ]);
                      }}
                    />
                    <div
                      class="invalid-feedback"
                      ref={formInputs.priceGross.message}
                    ></div>
                  </div>
                </div>
                <div class="form-group">
                  {/**taxes */}
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
                {/**discount */}
                <div className="form-group" ref={formInputs.discount.group}>
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
                        ref={formInputs.discount.input}
                        onChange={(e) => {
                          onChangeProductData(
                            "discount",
                            e.target.value,
                            TYPE_FIELDS.number
                          );
                          validationFormFields(e.target.value, "discount", [
                            VALIDATIONS_TYPES.Number,
                            [VALIDATIONS_TYPES.Min, 0],
                            [VALIDATIONS_TYPES.Max, 100],
                          ]);
                        }}
                      />
                      <span class="input-group-text">%</span>
                      <div
                        class="invalid-feedback"
                        ref={formInputs.discount.message}
                      ></div>
                    </div>
                  </fieldset>
                </div>
                {/**priceFInal */}
                <div className="form-group" ref={formInputs.priceFinal.group}>
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
                      ref={formInputs.priceFinal.input}
                      onChange={(e) => {
                        validationFormFields(e.target.value, "priceFinal", [
                          VALIDATIONS_TYPES.Number,
                          [VALIDATIONS_TYPES.Min, 0],
                        ]);
                      }}
                      readOnly
                    />
                    <div
                      class="invalid-feedback"
                      ref={formInputs.priceFinal.message}
                    ></div>
                  </div>
                </div>
                <div className="form-group" ref={formInputs.unitsBuyes.group}>
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
                    ref={formInputs.unitsBuyes.input}
                    onChange={(e) => {
                      onChangeProductData(
                        "unitsBuyes",
                        e.target.value,
                        TYPE_FIELDS.number
                      );
                      validationFormFields(e.target.value, "unitsBuyes", [
                        VALIDATIONS_TYPES.Number,
                        [VALIDATIONS_TYPES.Min, 0],
                        [VALIDATIONS_TYPES.Max, 999],
                      ]);
                    }}
                  />
                  <div
                    class="invalid-feedback"
                    ref={formInputs.unitsBuyes.message}
                  ></div>
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
