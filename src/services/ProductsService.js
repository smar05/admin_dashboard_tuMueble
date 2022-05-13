import * as ConstData from "../common/ConstData";

const API_PRODUCTS = `${ConstData.URL_BACK}api/products`;

export default class ProductsService {
  /**
   * Find all products
   *
   * @static
   * @returns All products
   * @memberof ProductsService
   */
  static findAll = () => {
    return fetch(API_PRODUCTS, { method: "GET" })
      .then((promise) => promise.json())
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Find product by id
   *
   * @static
   * @param {number} id Product id
   * @returns The product by id
   * @memberof ProductsService
   */
  static findOne = (id) => {
    if (!id) {
      return null;
    }
    return fetch(`${API_PRODUCTS}/detail/${id}`, { method: "GET" })
      .then((promise) => promise.json())
      .catch((err) => {
        console.error(err);
      });
  };

  static create = (product) => {
    if (!product) return null;

    return fetch(`${API_PRODUCTS}/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };

  static update = (productId, product) => {
    if (!productId) return null;

    return fetch(`${API_PRODUCTS}/edit/${productId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };

  static delete = (productId) => {
    if (!productId) return null;

    return fetch(`${API_PRODUCTS}/delete/${productId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
}
