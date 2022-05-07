import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProduct from "./pages/editProduct/EditProduct";
import Error404 from "./pages/error404/Error404";
import Home from "./pages/home/Home";
import ProductsList from "./pages/productsList/ProductsList";
import Footer from "./shared/footer/Footer";
import Navbar from "./shared/navbar/Navbar";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <div className="container p-4">
          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/products-list" element={<ProductsList />} />
            <Route path="/edit-product" element={<EditProduct />} />
            <Route path="/create-product" element={<EditProduct />} />
            <Route path="*" exact={true} element={<Error404 />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
