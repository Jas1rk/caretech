import Swal from "sweetalert2";
import './Sweatalert.css'


const confirmAlert = (content) => {
    return Swal.fire({
       html: `<div class="custom-text">${content}</div>`,
       showCancelButton: true,
       cancelButtonText: 'Cancel',
       confirmButtonText: 'Confirm',
       customClass: {
          popup: 'custom-width',
          confirmButton: 'confirm-btn',
          cancelButton: 'cancel-btn',
          title: 'custom-title',
          content: 'custom-content'
       },
       buttonsStyling: false,
    })
 }
 
 export default confirmAlert;