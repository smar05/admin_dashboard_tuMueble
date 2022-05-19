import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL_BACK } from "../../common/ConstData.js";
import alert from "sweetalert2";
import { UserContext } from "../../context/user.context.js";

function Login() {
  let navigate = useNavigate();

  //Context User Global APP
  const { setUser } = useContext(UserContext);

  //State values for login
  const [login, setLogin] = useState({
    email: "",
    pwd: "",
  });

  //Store object login on events from inputs
  const handleInputs = (eventObj) => {
    setLogin({
      ...login,
      [eventObj.target.name]: eventObj.target.value,
    });
  };

  //Store update the ContextUser
  const handleContextUser = (resp) => {
    setUser({
      name: resp.name,
      imagen: resp.imagen,
      isAdmin: resp.isAdmin,
    });
  };

  //Execute the object to backend
  const postLogin = async () => {
    fetch(`${URL_BACK}api/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        let { errors } = response;

        if (errors) {
          let err = errors[0].msg || errors;
          alert.fire({
            icon: "error",
            title: "error",
            text: err,
          });
        } else {
          alert.fire({
            icon: "success",
            timer: 1000,
          });
          localStorage.setItem("Auth", response.auth);
          handleContextUser(response);
          navigate("/", { replace: true });
        }
      })
      .catch((err) =>
        alert.fire({
          icon: "error",
          title: "Ha ocurrido un error al momento de loguearse",
          text: err,
        })
      );
  };

  return (
    <form
      id="Login"
      className="my-5 col-sm-12 col-md-8 d-flex flex-column bg-white pt-3 rounded-lg shadow-lg px-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await postLogin();
      }}
    >
      <div className="row mb-4 justify-content-center">
        <div className="col text-center">
          <span className="h4 text-black-50">Iniciar sesión</span>
        </div>
      </div>

      <div className="form-outline mb-2">
        <input
          type="email"
          id="email"
          name="email"
          className="form-control  text-center rounded-lg border"
          style={{ fontSize: "16px" }}
          required
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label className="form-label h6 mt-3 text-black-50" for="email">
          Email
        </label>
      </div>

      <div className="form-outline mb-2">
        <input
          type="password"
          id="pwd"
          name="pwd"
          className="form-control  text-center rounded-lg border"
          style={{ fontSize: "16px" }}
          required
          onChange={(e) => handleInputs(e)}
          onLostPointerCapture={(e) => handleInputs(e)}
        />
        <label className="form-label h6 mt-3 text-black-50" for="pwd">
          Password
        </label>
      </div>

      <div className="row justify-content-center">
        <button type="submit" className="btn bg-dark mb-4 rounded text-white">
          Logueame !
        </button>
      </div>

      <div className="row mb-4 justify-content-center">
        <div className="col text-center">
          <Link to="/user/create" className="h6">
            ¿No tienes una cuenta?{" "}
            <span className="text-danger h5"> crea una!</span>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
