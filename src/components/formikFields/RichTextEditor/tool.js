import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import InlineImage from "editorjs-inline-image";
import CodeBox from "@bomdi/codebox";

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

  image: {
    class: InlineImage,
    inlineToolbar: true,
    config: {
      embed: {
        display: true,
      },
      unsplash: {
        appName: "Gente Uni",
        clientId: process.env.NEXT_PUBLIC_APP_UNSPLASH_ACCESS_KEY,
      },
    },
  },
};

export default constants;
