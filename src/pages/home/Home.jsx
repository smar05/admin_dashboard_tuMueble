import { useContext } from "react";
import { UserContext } from "../../context/user.context.js";

function Home() {
  const { user, setUser, texto } = useContext(UserContext);

  const handleUser = () => {
    setUser({
      name: "Diego",
      imagen: "/img/avatar.jpg",
      isAdmin: 1,
    });
  };
  return (
    <div className="d-flex flex-column">
      <pre className="text-white bg-dark text-white p-3 rounded">
        {JSON.stringify(user, null, 2)}
        {JSON.stringify(texto, null, 2)}
      </pre>
      <button className="btn btn-success rounded" onClick={() => handleUser()}>
        Disparar Cambio
      </button>
    </div>
  );
}

export default Home;
