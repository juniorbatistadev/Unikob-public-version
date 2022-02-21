import { useEffect, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import Spinner from "@components/common/Spinner";

const i18n = require("./i18n.json");

const RichTextEditor = ({ setFieldValue, name }) => {
  const [editorTools, setEditorTools] = useState();

  useEffect(() => {
    const importConstants = async () => {
      const tools = (await import("./tool")).default;
      setEditorTools(tools);
    };

    importConstants();
  }, []);

  const ReactEditorJS = createReactEditorJS();

  return (
    <>
      {editorTools ? (
        <ReactEditorJS
          data={JSON.parse(localStorage.getItem("editorSave"))}
          onChange={(e) => setFieldValue(name, e.saver)}
          tools={editorTools}
          placeholder={`Aqui va tu contenido`}
          i18n={i18n}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default RichTextEditor;
