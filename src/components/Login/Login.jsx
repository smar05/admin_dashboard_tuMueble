import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL_BACK } from "../../common/ConstData.js";
import alert from "sweetalert2";

function Login() {
  
  let navigate= useNavigate();

  const [login, setLogin] = useState({
    email:"",
    pwd:""
  });
  
  //Store object login on events from inputs 
  const handleInputs = (eventObj) => {
    setLogin({
      ...login,
      [eventObj.target.name]:eventObj.target.value
    })
  }

  //Execute the object to backend
   const postLogin = async () => {

    await fetch(`${URL_BACK}api/login`, {
      method:"POST",
      mode: "cors",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login),
      }
    )
    .then(response => {
      return response.json();
    }) 
    .then(response =>{
      let {errors} = response;

      if (errors) {
        let err = errors[0].msg || errors;
        alert.fire({
          icon:"error",
          title:"error",
          text: err
        })
      } else {
        alert.fire({
          icon:"success",
          timer:1000
        });
        localStorage.setItem("auth",response.auth);
        navigate("/",{replace:true});
      } 
    })
    .catch(err => alert.fire({
      icon:"error",
      title:"Ha ocurrido un error al momento de loguearse",
      text: err
    }));
  }

  return (
    <form
      id="Login"
      className="mt-5 col-sm-12 col-md-8 d-flex flex-column"
      onSubmit={ async (e) => {
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
          className="form-control  text-center rounded-lg"
          style={{ fontSize: "16px" }}
          required
          onChange={e=> handleInputs(e) }
          onLostPointerCapture={e=> handleInputs(e) }
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
          className="form-control  text-center rounded-lg"
          style={{ fontSize: "16px" }}
          required
          onChange={e=> handleInputs(e) }
          onLostPointerCapture={e=> handleInputs(e) }
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
