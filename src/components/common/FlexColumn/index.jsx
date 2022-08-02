import styles from "./index.module.css";

const FlexColumn = ({
  children,
  margin,
  padding,
  className,
  alignItems,
  justifyContent,
  gap,
  ...props
}) => {
  const classNames = [styles.flexColumn, className].join(" ");

  return (
    <div
      className={classNames}
      {...props}
      style={{
        margin,
        padding,
        alignItems,
        justifyContent,
        gap,
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

FlexColumn.defaultProps = {
  className: " ",
  margin: null,
  alignItems: null,
  justifyContent: null,
  padding: null,
  gap: null,
};

export default FlexColumn;
