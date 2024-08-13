import Swal from "sweetalert2";
import "./Warning.css";

const WarningAlert = () => {
  return Swal.fire({
    text: "Please log in to access your profile.",
    icon: "warning",
    showCancelButton:true,
    confirmButtonText: "Login",
    cancelButtonText:"Cancel",
    customClass: {
      popup: "custom-popup",
      confirmButton: "custom-button",
      cancelButton:"cancel-button",
    },
  });
};

export default WarningAlert;
