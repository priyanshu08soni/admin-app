import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/Resetpassword";
import ForgotPassword from "./pages/Forgotpassword";
import Login from "./pages/Login";
import MainLayout from "./Components/MainLayout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
