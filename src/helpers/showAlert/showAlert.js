// import swal from "@sweetalert/with-react";
// import "./index.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default async function showAlert(props) {
  // await swal({
  //   icon: props.type,
  //   title: props.title,
  //   text: props.text,
  //   content: <div>{props.content}</div>
  // });

  const MySwal = withReactContent(Swal);

  await MySwal.fire({
    icon: props.type,
    title: props.title,
    text: props.text,

    // didOpen: () => {
    // `MySwal` is a subclass of `Swal`
    //   with all the same instance & static methods
    // MySwal.clickConfirm();
    // },
  });
}
