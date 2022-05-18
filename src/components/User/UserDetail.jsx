import { Fragment, useContext, useState } from "react";
import { UserContext } from "../../context/user.context.js";
import { useNavigate } from "react-router-dom";
import { UserServices } from "../../services/users.services.js";

function UserDetail() {
  let navigate = useNavigate();
  
  //instance the class user services
  const userServices=new UserServices();

  //Context State User Global
  const { user } = useContext(UserContext);

  //Body Form the user
  const [bodyUser, setBodyUser] = useState({
    firstName: "",
    lastName: "",
    dateBorn: "",
    gender: 0,
    email: "",
    country: "",
    province_state: "",
    city_town: "",
    address: "",
    password: "",
    passwordTry: "",
    image: "",
  });

  //Store object login on events from inputs
  const handleInputs = (eventObj) => {
    setBodyUser({
      ...bodyUser,
      [eventObj.target.name]: eventObj.target.value,
    });
    console.log(bodyUser);
  };

  //Create Users

  return (
    <form
      id="user"
      className="form col-12 col-sm-10 col-md-8 d-flex flex-column bg-white pt-3 mb-5 rounded-lg shadow-lg px-4"
      method="POST"
      onSubmit={ (e) => {
        e.preventDefault();
        let a= userServices.create(bodyUser);
        console.log("Me llego esto del servicio de crear usuario", a);
        if (a) {
          navigate("/login", { replace: true });          
        } 
      }}
    >
      <span className="h4 text-black-50 mb-3 text-center">
        Detalle de usuario
      </span>

      <div className="input-group-sm my-2">
        <input
          type="text"
          className="form-control text-center rounded"
          required
          style={{ fontSize: "16px" }}
          name="firstName"
          minLength={2}
          maxLength={128}
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label
          className="form-label h6 mt-2 text-black-50 d-block"
          for="form2Example1"
        >
          Nombres
        </label>
      </div>

      <div className="input-group-sm my-2">
        <input
          type="text"
          className="form-control text-center rounded"
          required
          style={{ fontSize: "16px" }}
          name="lastName"
          minLength={2}
          maxLength={128}
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label
          className="form-label h6 mt-2 text-black-50 d-block"
          for="form2Example1"
        >
          Apellidos
        </label>
      </div>

      <div className="input-group-sm my-2">
        <input
          type="date"
          className="form-control text-center rounded"
          required
          style={{ fontSize: "16px" }}
          name="dateBorn"
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label
          className="form-label h6 mt-2 text-black-50 d-block"
          for="form2Example1"
        >
          Fecha de nacimiento
        </label>
      </div>

      <div className="input-group-sm my-2">
        <select
          className="custom-select form-control"
          style={{ fontSize: "16px" }}
          required
          name="gender"
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        >
          <option selected>Elije...</option>
          <option value={1}>Hombre</option>
          <option value={2}>Mujer</option>
          <option value={3}>No definido</option>
        </select>
        <label
          className="form-label h6 mt-2 text-black-50 d-block"
          for="form2Example1"
        >
          Genero
        </label>
      </div>

      <div className="input-group-sm my-2">
        <input
          type="email"
          className="form-control text-center rounded"
          style={{ fontSize: "16px" }}
          name="email"
          required
          onChange={(e) => {
            handleInputs(e)
          }}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label
          className="form-label h6 mt-2 text-black-50 d-block"
          for="form2Example1"
        >
          Email
        </label>
      </div>

      <div className="input-group-sm my-2">
        <input
          type="text"
          className="form-control text-center rounded"
          style={{ fontSize: "16px" }}
          required
          name="phone"
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label
          className="form-label h6 mt-2 text-black-50 d-block"
          for="form2Example1"
        >
          Teléfono
        </label>
      </div>

      <div className="input-group-sm my-2">
        <input
          type="file"
          className="form-control text-center rounded"
          accept="image/*"
          style={{ fontSize: "16px" }}
          name="image"
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label className="text-label h6 mt-2 text-black-50" for="form2Example1">
          Imagen de perfil
        </label>
      </div>

      <div className="input-group-sm my-2">
        <input
          type="text"
          className="form-control text-center rounded"
          style={{ fontSize: "16px" }}
          name="country"
          required
          minLength={2}
          maxLength={128}
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label
          className="form-label h6 mt-2 text-black-50 d-block"
          for="form2Example1"
        >
          País
        </label>
      </div>

      <div className="input-group-sm my-2">
        <input
          type="text"
          className="form-control text-center rounded"
          style={{ fontSize: "16px" }}
          name="province_state"
          required
          minLength={2}
          maxLength={128}
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label
          className="form-label h6 mt-2 text-black-50 d-block"
          for="form2Example1"
        >
          Provincia/Estado
        </label>
      </div>

      <div className="input-group-sm my-2">
        <input
          type="text"
          className="form-control text-center rounded"
          style={{ fontSize: "16px" }}
          name="city_town"
          required
          minLength={2}
          maxLength={128}
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label
          className="form-label h6 mt-2 text-black-50 d-block"
          for="form2Example1"
        >
          Ciudad/Pueblo
        </label>
      </div>

      <div className="input-group-sm my-2">
        <textarea
          className="form-control rounded"
          style={{ fontSize: "16px", resize: "none" }}
          rows="3"
          name="address"
          required
          minLength={2}
          maxLength={512}
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        ></textarea>
        <label
          className="form-label h6 mt-2 text-black-50 d-block"
          for="form2Example1"
        >
          Dirección
        </label>
      </div>

      {user === null ? (
        <Fragment>
          <div className="input-group-sm my-2">
            <input
              type="password"
              className="form-control text-center rounded"
              style={{ fontSize: "16px" }}
              name="password"
              required
              minLength={10}
              maxLength={64}
              onChange={(e) => handleInputs(e)}
              onLostPointerCapture={(e) => handleInputs(e)}
            />
            <label
              className="form-label h6 mt-2 text-black-50 d-block"
              for="form2Example1"
            >
              Contraseña
            </label>
          </div>
          <div className="input-group-sm my-2">
            <input
              type="password"
              className="form-control text-center rounded"
              style={{ fontSize: "16px" }}
              name="passwordTry"
              required
              minLength={10}
              maxLength={64}
              onChange={(e) => handleInputs(e)}
              onLostPointerCapture={(e) => handleInputs(e)}
            />
            <label
              className="form-label h6 mt-2 text-black-50 d-block"
              for="form2Example1"
            >
              Repite la contraseña
            </label>
          </div>
        </Fragment>
      ) : (
        ""
      )}

      <div className="d-flex my-4">
        <input
          type="reset"
          className="btn btn-danger col-4 d-inline-block rounded"
          value="Restablecer"
          name="resetFields"
        />

        <input
          type="submit"
          className="btn btn-success rounded col-4 ml-auto"
          value="Enviar"
          name="submitFields"
        />
      </div>
    </form>
  );
}

export default UserDetail;