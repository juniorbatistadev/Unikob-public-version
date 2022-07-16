import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "./index.module.css";

const Alert = withReactContent(
  Swal.mixin({
    customClass: {
      confirmButton: styles.confirmButton,
      cancelButton: styles.cancelButton,
      htmlContainer: styles.htmlContainer,
    },
    backdrop: `rgba(65, 115, 178, 0.45)`,
    buttonsStyling: false,
  })
);

export default Alert;
