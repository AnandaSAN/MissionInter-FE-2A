import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./components/layout/AdminLayout";
import Product from "./pages/Product";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Admin /> },
      { path: "product", element: <Product /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
