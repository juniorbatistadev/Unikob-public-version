import React, { useState } from "react";
import styles from "./index.module.css";
import Text from "../../common/Text";

function FileField({ setFieldValue, onChangeCallBack, ...props }) {
  const [fileName, setFileName] = useState(null);

  const onChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFieldValue("file", file);
      if (onChangeCallBack) {
        onChangeCallBack(file);
      }
    }
  };

  return (
    <label className={styles.container}>
      <span className={styles.button}>Buscar archivo</span>
      <Text
        text={fileName ? fileName : "Seleciona un archivo"}
        margin="0px 0px 0px 5px"
      />

      <input
        type="file"
        {...props}
        onChange={onChange}
        className={styles.fileInput}
      />
    </label>
  );
}

export default FileField;
