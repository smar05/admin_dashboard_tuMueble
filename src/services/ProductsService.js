import * as ConstData from "../common/ConstData";

const API_PRODUCTS = `${ConstData.URL_BACK}api/products`;

export default class ProductsService {
  /**
   * Find all products
   *
   * @static
   * @memberof ProductsService
   */
  static findAll = () => {
    return fetch(API_PRODUCTS, { method: "GET" })
      .then((promise) => promise.json())
      .catch((err) => {
        console.error(err);
      });
  };
}
