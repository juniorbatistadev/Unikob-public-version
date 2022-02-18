import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";

// import LinkTool from "@editorjs/link";
// import Image from "@editorjs/image";
// import Raw from "@editorjs/raw";
// import Marker from "@editorjs/marker";
// import CheckList from "@editorjs/checklist";
// import Warning from "@editorjs/warning";
// import Table from "@editorjs/table";

const constants = {
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  code: Code,
  header: {
    class: Header,
    config: {
      placeholder: "Escribe Encabezado",
      levels: [1, 2, 3, 4],
      defaultLevel: 1,
    },
  },
  quote: Quote,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};

export default constants;
