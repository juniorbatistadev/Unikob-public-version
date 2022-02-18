import { useEffect, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import Spinner from "@components/common/Spinner";

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
          onChange={(e) => setFieldValue(name, e.saver)}
          tools={editorTools}
          placeholder={`Contenido`}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default RichTextEditor;
