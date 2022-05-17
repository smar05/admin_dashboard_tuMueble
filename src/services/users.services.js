import alert from "sweetalert2";
const { URL_BACK } = require("../common/ConstData.js");

const user = {};

/**
 * Create User
 * @param {Object} newUser 
 * @returns Reponse results 
 */
user.create =(newUser) =>{

     const result =fetch(`${URL_BACK}api/user/create`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(resp => resp.json())
    .catch(error => {
        alert.fire({
            icon:"error",
            text:error,
            color:error
        })
    })

    return result;
}

module.exports=user;