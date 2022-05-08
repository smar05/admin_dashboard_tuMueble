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
}
