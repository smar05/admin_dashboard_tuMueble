import React, { Fragment } from "react";
import logo from "../../logo.svg";

const changeisActivo = () => {};

const EditProduct = () => {
  return (
    <Fragment>
      <div className="row text-center offset-md-2">
        <h1>Crear Producto</h1>
      </div>
      {/**Visualizacion del producto */}
      <div className="row">
        <div className="col-md-6 offset-md-3 mb-3">
          <div className="card card-body text-center">
            <h3 className="font-weight-bold">Nombre: </h3>
            <img src={logo} alt="mainImage" />
            <p>
              <span className="font-weight-bold">Descripción: </span>
            </p>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <span className="font-weight-bold">SKU: </span>
                </p>
                <p>
                  <span className="font-weight-bold">Terminado: </span>
                </p>
                <p>
                  <span className="font-weight-bold">Categoria: </span>
                </p>
                <p>
                  <span className="font-weight-bold">Cant. Inventario: </span>
                </p>
                <p>
                  <span className="font-weight-bold">Unidades Vendidas: </span>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <span className="font-weight-bold">Precio Bruto: </span>
                </p>
                <p>
                  <span className="font-weight-bold">Impuesto: </span>
                </p>
                <p>
                  <span className="font-weight-bold">Descuento: </span>
                </p>
                <p>
                  <span className="font-weight-bold">Precio Final: </span>
                </p>
                <p>
                  <span className="font-weight-bold">Activo: </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  />
                </div>
                <div className="form-group">
                  <label
                    for="categoryId"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Categoria
                  </label>
                  <select name="categoryId" className="form-control">
                    <option value="" disabled selected></option>
                    <option value="1">Sofas</option>
                    <option value="2">Camas</option>
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
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isActive"
                    defaultChecked={true}
                  />
                  <label
                    className="form-check-label font-weight-bold"
                    for="flexSwitchCheckChecked"
                  >
                    ¿Activo?
                  </label>
                </div>
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
                  <input
                    type="number"
                    name="priceGross"
                    placeholder="Precio Bruto"
                    className="form-control"
                    id="priceGross"
                  />
                </div>
                <div className="form-group">
                  <label
                    for="categoryId"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Impuestos
                  </label>
                  <select name="categoryId" className="form-control">
                    <option value="" disabled selected></option>
                    <option value="1">19%</option>
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
                    <input
                      id="discount"
                      className="form-control"
                      type="number"
                      name="discount"
                      placeholder="Descuento"
                    />
                  </fieldset>
                </div>
                <div className="form-group">
                  <label
                    for="priceFinal"
                    className="form-label mt-4 font-weight-bold"
                  >
                    Precio Final
                  </label>
                  <input
                    type="number"
                    name="priceFinal"
                    placeholder="Precio Final"
                    className="form-control"
                    id="priceFinal"
                    readOnly
                  />
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
