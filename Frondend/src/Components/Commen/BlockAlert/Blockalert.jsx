import Swal from "sweetalert2";
import "./Blockalert.css"

const Blockalert = () => {
    return Swal.fire({
        text: "You have been blocked ! please contact ",
        icon: "warning",
        customClass: {
          popup: "custom-popup",
          confirmButton: "custom-button",
          cancelButton:"cancel-button",
        },
      });
   
}

export default Blockalert
