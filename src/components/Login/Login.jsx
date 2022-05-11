 import { Link } from "react-router-dom";
 
 function Login() {
     return (
        <form method="POST" action="/login" id="Login"  className="mt-5 col-sm-12 col-md-8 d-flex flex-column" onSubmit={e => {
            e.preventDefault();
        }}>

        <div className="row mb-4 justify-content-center">
            <div className="col text-center">
              <span className="h4 text-black-50">Iniciar sesión</span>
            </div>
        </div>

        <div className="form-outline mb-2">
          <input type="email" id="form2Example1" className="form-control  text-center" style={{fontSize:"16px"}} required/>
          <label className="form-label h6 mt-3 text-black-50" for="form2Example1">Email</label>
        </div>

        <div className="form-outline mb-2">
          <input type="password" id="form2Example2" className="form-control  text-center" style={{fontSize:"16px"}} required/>
          <label className="form-label h6 mt-3 text-black-50" for="form2Example2">Password</label>
        </div>
            
        <div className="row justify-content-center">
            <button type="submit" className="btn bg-dark mb-4 rounded text-white">
                Logueame !
            </button>
        </div>

        <div className="row mb-4 justify-content-center">
            <div className="col text-center">
                <Link to="/user/create" className="h6">¿No tienes una cuenta? <span className="text-danger h5"> crea una!</span></Link>
            </div>
        </div>

      </form>
     );
 }

 export default Login;