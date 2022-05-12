import { Fragment } from "react";
import { URL_BACK } from "../../common/ConstData.js";

function UserDetail({user}){

    const createUser= fetch(`${URL_BACK}api/user/create`, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            firstName: "HOLA"
          }),
        }).then(resp =>{
            console.log("ESto me llego", resp)
        }).catch(error=>console.error(error));

    

    return (
        <form className="form col-12 col-sm-10 col-md-8 d-flex flex-column" onSubmit={(e)=>{
            alert("me Envie");
            createUser();
        }}>
            <span className="h4 text-black-50 mb-3 text-center">Detalle de usuario</span>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" required style={{fontSize:"16px"}} name="firstName" />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Nombres</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" required style={{fontSize:"16px"}} name="lastName" />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Apellidos</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="date" className="form-control text-center rounded" required style={{fontSize:"16px"}} name="dateBorn" />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Fecha de nacimiento</label>
            </div>

            <div className="input-group-sm my-2">
                <select className="custom-select form-control" style={{fontSize:"16px"}} name="gender">
                    <option selected>Elije...</option>
                    <option value={1}>Hombre</option>
                    <option value={2}>Mujer</option>
                    <option value={3}>No definido</option>
                </select>
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Genero</label>
            </div>
            
            <div className="input-group-sm my-2">
                <input type="email" className="form-control text-center rounded" style={{fontSize:"16px"}} name="email" />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Email</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" style={{fontSize:"16px"}} name="phone" />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Teléfono</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="file" className="form-control text-center rounded" accept="image/*" style={{fontSize:"16px"}} name="image" />
                <label className="text-label h6 mt-2 text-black-50" for="form2Example1">Imagen de perfil</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" style={{fontSize:"16px"}} name="country" />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">País</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" style={{fontSize:"16px"}} name="province-state" />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Provincia/Estado</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" style={{fontSize:"16px"}} name="city-town" />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Ciudad/Pueblo</label>
            </div>

            <div className="input-group-sm my-2">
                <textarea className="form-control rounded" style={{fontSize:"16px", resize:"none"}} rows="3" name="addressLine"></textarea>
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Dirección</label>
            </div>

            { !user ? 
                <Fragment>
                    <div className="input-group-sm my-2">
                        <input type="password" className="form-control text-center rounded" style={{fontSize:"16px"}} name="password" />
                        <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Contraseña</label>
                    </div>
                    <div className="input-group-sm my-2">
                        <input type="password" className="form-control text-center rounded" style={{fontSize:"16px"}} name="passwordTry" />
                        <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Repite la contraseña</label>
                    </div>
                </Fragment> :
                ""
            }

            <div className="d-flex my-4">

                <input type="reset" className="btn btn-danger col-4 d-inline-block rounded" value="Restablecer" name="resetFields" /> 
        
                <input type="submit" className="btn btn-success rounded col-4 ml-auto" value="Enviar" name="submitFields" />

            </div>
        </form>
    );
}

export default UserDetail;