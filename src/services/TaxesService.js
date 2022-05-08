import * as ConstData from "../common/ConstData";

const API_TAXES = `${ConstData.URL_BACK}api/taxes`;

export default class TaxesService {
  /**
   * Find all taxes
   *
   * @static
   * @returns All taxes
   * @memberof TaxesService
   */
  static findAll = () => {
    return fetch(API_TAXES, { method: "GET" })
      .then((promise) => promise.json())
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Find tax by id
   *
   * @static
   * @param {number} id Tax id
   * @returns The Tax by id
   * @memberof TaxesService
   */
  static findOne = (id) => {
    if (!id) {
      return null;
    }
    return fetch(`${API_TAXES}/detail/${id}`, { method: "GET" })
      .then((promise) => promise.json())
      .catch((err) => {
        console.error(err);
      });
  };
}
