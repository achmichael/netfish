import { Route, Routes } from "react-router-dom";
import Display from "./views/Display.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Dashboard from "./views/Dashboard.jsx";
import ForgotPassword from "./views/ForgotPassword.jsx";
import ResetPassword from "./views/ResetPassword.jsx";
import KeranjangBelanja from "./components/KeranjangBelanja.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Display />}></Route>
      <Route path="/auth/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/reset-password" element={<ResetPassword/>}></Route>
      <Route path="/cart" element={<KeranjangBelanja/>}></Route>
    </Routes>
  );
}

export default App;
