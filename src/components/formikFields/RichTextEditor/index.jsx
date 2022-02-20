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
          i18n={{
            messages: {
              toolNames: {
                Text: "Texto",
                Heading: "Encabezado",
                List: "Lista",
                Quote: "Cita",
                Code: "Codigo",
                Delimiter: "Limitador",
                Link: "Enlance",
                Marker: "Мarcador",
                Bold: "Negritas",
                Italic: "Cursivas",
                InlineCode: "Codigo Directo",
              },

              ui: {
                blockTunes: {
                  toggler: {
                    "Click to tune": "Click para ajustar",
                    "or drag to move": "o arrastra para mover",
                  },
                },
                inlineToolbar: {
                  converter: {
                    "Convert to": "Convertir en",
                  },
                },
                toolbar: {
                  toolbox: {
                    Add: "Añadir",
                  },
                },
              },
            },
          }}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default RichTextEditor;
