import { Register, Otp, Login, Forgetpassword } from "./Components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/otp" element={<Otp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgetpassword" element={<Forgetpassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
