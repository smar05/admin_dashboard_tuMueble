import { Link } from "react-router-dom";

function Footer() {
  return (

      <footer className="text-center text-white-50 mt-auto shadow bg-dark">

        <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
          © 2022 Copyright  
          <Link className="text-white-50 h6" to="/"> tumueble.com</Link>
        </div>

      </footer>

  );
}

export default Footer;
