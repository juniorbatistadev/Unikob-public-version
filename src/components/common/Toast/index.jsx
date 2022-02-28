import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "./index.module.css";

const Toast = withReactContent(
  Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  })
);

export default Toast;
