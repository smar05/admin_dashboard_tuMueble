export class Functions {
  /**
   * Receibe a file and return the same on base 64
   *
   * @static
   * @param {*} file
   * @return {Promise<string>} A image on base64
   * @memberof Functions
   */
  static fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result != null ? reader.result.toString() : "");
      reader.onerror = (error) => reject(error);
    });
  }
}
