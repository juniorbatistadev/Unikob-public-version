import Rate from "rc-rate";
import "rc-rate/assets/index.css";

const Rater = ({ name, setValue, value, disable, size, ...props }) => {
  return (
    <div>
      <Rate
        onChange={(rating) => setValue(name, rating)}
        defaultValue={2.5}
        style={{ fontSize: size ? size : 20 }}
        allowHalf
        allowClear={false}
        character={<i className="anticon anticon-star" />}
        value={value}
        disabled={disable}
        {...props}
      />
    </div>
  );
};

Rater.defaultProps = {
  interactive: true,
};

export default Rater;
