import Swal from "sweetalert2";

export class Alerts {
  //Funcion de alertas basicas
  static basicAlert(title, text, icon) {
    Swal.fire(title, text, icon);
  }

  //Funcion para alerta de confirmacion
  static confirmAlert(title, text, icon, confirmButtonText) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
    });
  }
}
