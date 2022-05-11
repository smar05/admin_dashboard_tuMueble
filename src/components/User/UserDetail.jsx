import { Fragment } from "react";

function UserDetail({user}){
    return (
        <form className="form col-12 col-sm-10 col-md-8 d-flex flex-column">
            <span className="h4 text-black-50 mb-3 text-center">Detalle de usuario</span>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" required style={{fontSize:"16px"}} />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Nombres</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" required style={{fontSize:"16px"}} />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Apellidos</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="date" className="form-control text-center rounded" required style={{fontSize:"16px"}} />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Fecha de nacimiento</label>
            </div>

            <div className="input-group-sm my-2">
                <select className="custom-select form-control" style={{fontSize:"16px"}}>
                    <option selected>Elije...</option>
                    <option value={1}>Hombre</option>
                    <option value={2}>Mujer</option>
                    <option value={3}>No definido</option>
                </select>
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Genero</label>
            </div>
            
            <div className="input-group-sm my-2">
                <input type="email" className="form-control text-center rounded" style={{fontSize:"16px"}} />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Email</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" style={{fontSize:"16px"}} />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Teléfono</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="file" className="form-control text-center rounded" accept="image/*" style={{fontSize:"16px"}} />
                <label className="text-label h6 mt-2 text-black-50" for="form2Example1">Imagen de perfil</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" style={{fontSize:"16px"}} />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">País</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" style={{fontSize:"16px"}} />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Provincia/Estado</label>
            </div>

            <div className="input-group-sm my-2">
                <input type="text" className="form-control text-center rounded" style={{fontSize:"16px"}} />
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Ciudad/Pueblo</label>
            </div>

            <div className="input-group-sm my-2">
                <textarea className="form-control rounded" style={{fontSize:"16px", resize:"none"}} rows="3" ></textarea>
                <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Dirección</label>
            </div>

            { !user ? 
                <Fragment>
                    <div className="input-group-sm my-2">
                        <input type="password" className="form-control text-center rounded" style={{fontSize:"16px"}} />
                        <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Contraseña</label>
                    </div>
                    <div className="input-group-sm my-2">
                        <input type="password" className="form-control text-center rounded" style={{fontSize:"16px"}} />
                        <label className="form-label h6 mt-2 text-black-50 d-block" for="form2Example1">Repite la contraseña</label>
                    </div>
                </Fragment> :
                ""
            }

            <div className="d-flex my-4">

                <input type="reset" className="btn btn-danger col-4 d-inline-block rounded" value="Restablecer" /> 
        
                <input type="submit" className="btn btn-success rounded col-4 ml-auto" value="Enviar" />

            </div>
            
            

        </form>
    );
}

export default UserDetail;