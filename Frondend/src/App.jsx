import { Error404 } from "./Components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { backendUrl } from "./service/backendUrl";
import { disconnectSocket, setSocket } from "./Redux/SocketClient/Socketclient";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import DoctorRoutes from "./Routes/DoctorRoutes";
import AOS from "aos";
import "aos/dist/aos.css";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(backendUrl);
    dispatch(setSocket(socket));

    return () => {
      socket.disconnect();
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          {UserRoutes()} 
          {AdminRoutes()} 
          {DoctorRoutes()} 
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
