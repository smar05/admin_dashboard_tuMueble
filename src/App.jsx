import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import UserCreate from "./pages/CreateUser/CreateUser";
import UserDetail from "./components/User/UserDetail"
import EditProduct from "./pages/editProduct/EditProduct";
import Error404 from "./pages/error404/Error404";
import Home from "./pages/home/Home";
import ProductsList from "./pages/productsList/ProductsList";
import Footer from "./shared/footer/Footer";
import Navbar from "./shared/navbar/Navbar";
import { UserContext } from "./context/user.context.js";
import { useState } from "react";
import UserBarMenu from "./components/UserBarMenu/UserBarMenu.jsx";

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
            <div className="p-1 d-flex flex-row">
              <UserBarMenu />
              <div className="container p-4 d-flex flex-column align-items-center justify-content-center">
                  <Routes>
                    <Route path="/" exact={true} element={<Home />} />
                    <Route path="/products-list" element={<ProductsList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin/dashboard" element={<ProductsList />} />
                    <Route path="/admin/detail" element={<UserDetail />} />
                    <Route path="/admin/products" element={<ProductsList />} />
                    <Route path="/admin/shops" element={<ProductsList />} />
                    <Route path="/user/dashboard" element={<ProductsList />} />
                    <Route path="/user/detail" element={<UserDetail />} />
                    <Route path="/user/shops" element={<ProductsList />} />
                    <Route path="/user/create" element={ <UserCreate /> } />
                    <Route path="/edit-product/:id" element={<EditProduct />} />
                    <Route path="/create-product" element={<EditProduct />} />
                    <Route path="*" exact={true} element={<Error404 />} />
                  </Routes>
              </div>
            </div>
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
