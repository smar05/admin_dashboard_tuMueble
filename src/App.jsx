import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import UserCreate from "./pages/CreateUser/CreateUser";
import EditProduct from "./pages/editProduct/EditProduct";
import Error404 from "./pages/error404/Error404";
import Home from "./pages/home/Home";
import ProductsList from "./pages/productsList/ProductsList";
import Footer from "./shared/footer/Footer";
import Navbar from "./shared/navbar/Navbar";
import { UserContext } from "./context/user.context.js";
import { useState } from "react";

function App() {

  /**
   * The strucutre de user is
   * {
   *  name: some name
   *  imagen: some imagen
   *  isAdmin: 0 user, 1 admin
   * }
   */
  const [user, setUser] = useState(null);

  return (

    <UserContext.Provider value={{
      user,
      setUser
    }}>
      <BrowserRouter>
        <div className="d-flex flex-column justify-content-center">
          <Navbar user="" />
            <div className="container p-4 d-flex flex-column align-items-center">
              <Routes>
                <Route path="/" exact={true} element={<Home />} />
                <Route path="/products-list" element={<ProductsList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user/create" element={ <UserCreate /> } />
                <Route path="/edit-product/:id" element={<EditProduct />} />
                <Route path="/create-product" element={<EditProduct />} />
                <Route path="*" exact={true} element={<Error404 />} />
              </Routes>
            </div>
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
