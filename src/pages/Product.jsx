import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return <h1>Product Page</h1>;
};

export default Product;
