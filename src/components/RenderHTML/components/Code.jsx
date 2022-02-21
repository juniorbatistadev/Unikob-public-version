import hljs from "highlight.js/lib/common";
import "highlight.js/styles/vs2015.css";
import { useEffect } from "react";

const Code = ({ data }) => {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <pre>
      <code>{data.code}</code>
    </pre>
  );
};

export default Code;
