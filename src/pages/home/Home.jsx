import { Fragment, useContext, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { UserContext } from "../../context/user.context.js";
import logo from "../../logo.svg";
import ProductsService from "../../services/ProductsService.js";

function Home() {
  let [productsSellest, setProductsSellest] = useState([]);
  let [productsCheapest, setProductsCheapest] = useState([]);
  let [productsDiscount, setProductsDiscount] = useState([]);
  const { user, setUser, texto } = useContext(UserContext);

  useEffect(() => {
    let urlProductsSellest = new URLSearchParams({
      order: [["unitsSelled", "DESC"]],
      limit: 3,
    });
    let urlProductsCheapest = new URLSearchParams({
      order: [["priceFinal", "ASC"]],
      limit: 3,
    });
    let urlProductsDiscount = new URLSearchParams({
      order: [["discount", "DESC"]],
      limit: 3,
    });

    ProductsService.findAll("?" + urlProductsSellest).then((res) => {
      setProductsSellest(res.data);
    });
    ProductsService.findAll("?" + urlProductsCheapest).then((res) => {
      setProductsCheapest(res.data);
    });
    ProductsService.findAll("?" + urlProductsDiscount).then((res) => {
      setProductsDiscount(res.data);
    });
  }, []);

  const handleUser = () => {
    setUser({
      name: "Diego",
      imagen: "/img/avatar.jpg",
      isAdmin: 0,
    });
  };
  return (
    <Fragment>
      <div className="d-flex flex-column">
        <pre className="text-white bg-dark text-white p-3 rounded">
          {JSON.stringify(user, null, 2)}
          {JSON.stringify(texto, null, 2)}
        </pre>
        <button
          className="btn btn-success rounded"
          onClick={() => handleUser()}
        >
          Disparar Cambio
        </button>
      </div>
      <div className="row">
        <Carousel>
          {productsSellest.map((product, index) => {
            return (
              <Fragment key={index}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={logo}
                    alt={"First slide" + index.toString()}
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Fragment>
            );
          })}
        </Carousel>
      </div>
    </Fragment>
  );
}

export default Home;
