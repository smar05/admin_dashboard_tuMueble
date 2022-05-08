import * as ConstData from "../common/ConstData";

const API_PRODUCT_CATEGORY = `${ConstData.URL_BACK}api/product-category`;

export default class ProductCategoryService {
  /**
   * Find all product categories
   *
   * @static
   * @returns All product categories
   * @memberof ProductCategoryService
   */
  static findAll = () => {
    return fetch(API_PRODUCT_CATEGORY, { method: "GET" })
      .then((promise) => promise.json())
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Find productCategory by id
   *
   * @static
   * @param {number} id Product category id
   * @returns The product category by id
   * @memberof ProductCategoryService
   */
  static findOne = (id) => {
    if (!id) {
      return null;
    }
    return fetch(`${API_PRODUCT_CATEGORY}/detail/${id}`, { method: "GET" })
      .then((promise) => promise.json())
      .catch((err) => {
        console.error(err);
      });
  };
}
