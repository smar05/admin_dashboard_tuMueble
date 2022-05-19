import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBasketShopping,
  faBoxes,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import "./UserBarMenu.css";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user.context.js"

function UserBarMenu() {

    const path=useLocation();
    
    //Declaration path accepted
    const pathAccept=[
        "/admin/dashboard",
        "/admin/detail",
        "/admin/products",
        "/admin/shops",
        "/user/dashboard",
        "/user/detail",
        "/user/shops"
    ];

    const { user } = useContext(UserContext);
    const userLink =(user && user.isAdmin===1) ? "admin":"user";

    console.log("UserLink", userLink);

    //products Admin WONDERFUL REACT :V
    const productsAdmin= _ => {
        if (user!==null && user.isAdmin===1) {
            return (
                <Link className="nav-link text-black-50" to={`/${userLink}/products`}>
                    <FontAwesomeIcon icon={faBoxes} size="2x" />
                </Link>
            );
        }
    };
    
    //Component dashboard
    const dashboard=(
      <div className="navbar navbar-light bg-white shadow p-1 rounded-lg d-flex flex-column mb-5 align-self-baseline">
          <Link className="nav-link text-black-50" to={`/${userLink}/dashboard`}>
            <FontAwesomeIcon icon={faDashboard} size="2x" />
          </Link>
  
          <Link className="nav-link text-black-50" to={`/${userLink}/shops`}>
            <FontAwesomeIcon icon={faBasketShopping} size="2x" />
          </Link>

          {productsAdmin()}

          <Link className="nav-link text-black-50" to={`/${userLink}/detail`}>
            <FontAwesomeIcon icon={faCircleUser} size="2x" />
          </Link>
      </div>
    );

    if(pathAccept.find( p=> p === path.pathname)!==undefined && user!==null){
        return dashboard;
    }

}

export default UserBarMenu;
