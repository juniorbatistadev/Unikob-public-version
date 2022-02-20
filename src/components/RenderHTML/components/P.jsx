import styles from "./P.module.css";
import Interweave from "interweave";

const P = ({ element }) => {
  //make A links open in a new tab
  function transform(node, children) {
    if (node.tagName === "A") {
      return (
        <a
          href={node.getAttribute("href")}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
  }

  return (
    <p className={styles.P}>
      <Interweave
        transform={transform}
        content={element.data.text}
        allowList={["a", "b", "i", "code"]}
      ></Interweave>
    </p>
  );
};

export default P;
