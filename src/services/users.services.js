const { URL_BACK } = require("../common/ConstData.js");

export class UserServices {

    /**
     * Create User
     * @param {Object} newUser 
     * @returns Reponse results 
     */
    create =(newUser) =>{
    
        return fetch(`${URL_BACK}api/user/create`,{
            method:"POST",
            mode:"cors",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(newUser)
        })
        .then(resp => {
            return resp.json()
        });      

    }

    /**
     * get info the user from server
     * @param {String} token JSON WEB TOKEN
     * @param {String} role Role the user: admin || user
     * @returns JSON from server
     */
    getUser=(token, role)=>{
        return fetch(`${URL_BACK}api/${role}/detail`,{
            method:"get",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
                "Auth": token
            }
        })
        .then(resp => {
            return resp.json()
        }); 
    }
}