import AdminLayout from "../components/layout/AdminLayout";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <h1>Admin Page</h1>
  );
};

export default Admin;
