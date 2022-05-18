import alert from "sweetalert2";
const { URL_BACK } = require("../common/ConstData.js");

export class UserServices {

    /**
     * Create User
     * @param {Object} newUser 
     * @returns Reponse results 
     */
    create =(newUser) =>{
    
        fetch(`${URL_BACK}api/user/create`,{
            method:"POST",
            mode:"cors",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(newUser)
        })
        .then(resp => {
        console.log("Response antes del JSON", resp);
        return resp.json()
        })
        .then(response => {
        let { errors } = response;
        console.log("Despues antes del JSON", response);
        
        if (errors) {
        let err = errors.map(err => err.msg) || errors;
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
        return true;
        
        }
        })
        .catch(error => {
            alert.fire({
                icon:"error",
                text:error,
                color:error
            })
        });

    }
}