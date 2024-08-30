import { Route, Routes } from "react-router-dom";
import Display from "./views/Display.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Dashboard from "./views/Dashboard.jsx";
import ForgotPassword from "./views/ForgotPassword.jsx";
import ResetPassword from "./views/ResetPassword.jsx";
import KeranjangBelanja from "./components/KeranjangBelanja.jsx";
import PrivateRoute from "./service/PrivateRoute.jsx";
import VerificationCode from "./views/VerificationCode.jsx";
import AddProduct from "./components/AddProduct.jsx";
import DashboardPartner from "./views/DashboardPartner.jsx";
import EditProduct from "./components/EditProduct.jsx";
import DashboardAdmin from "./views/DashboardAdmin.jsx";
import EditUser from "./components/EditUser.jsx";
import NotFound from "./storage/404.jsx";
import CheckOut from "./views/CheckOut.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Display />}></Route>
      <Route path="/auth/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} roles={["CONSUMER"]} />}
      />{" "}
      <Route
        path="/add-product"
        element={
          <PrivateRoute element={<AddProduct />} roles={["ADMIN", "PARTNER"]} />
        }
      />{" "}
      <Route
        path="/edit-product/:id"
        element={
          <PrivateRoute
            element={<EditProduct />}
            roles={["ADMIN", "PARTNER"]}
          />
        }
      ></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
      <Route
        path="/cart"
        element={
          <PrivateRoute element={<KeranjangBelanja />} roles={["CONSUMER"]} />
        }
      ></Route>
      <Route path="/verification-code" element={<VerificationCode />}></Route>
      <Route
        path="/dashboard-partner"
        element={
          <PrivateRoute element={<DashboardPartner />} roles={["PARTNER"]} />
        }
      ></Route>
      <Route
        path="/dashboard-admin"
        element={
          <PrivateRoute element={<DashboardAdmin />} roles={["ADMIN"]} />
        }
      ></Route>
      <Route
        path="/edit-user/:id"
        element={<PrivateRoute element={<EditUser />} roles={["ADMIN"]} />}
      ></Route>
      <Route
        path="/checkout"
        element={<PrivateRoute element={<CheckOut />} roles={["CONSUMER"]} />}
      ></Route>
      {/* Route 404 dengan wildcard, untuk menangkap rute yang tidak ditemukan */}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
