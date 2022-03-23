import StarActive from "@assets/icons/star-active.svg";
import StarDisabled from "@assets/icons/star-disabled.svg";
import StarHalf from "@assets/icons/star-is-half.svg";

const Star = ({ isActive, isActiveHalf, willBeActive, isDisabled, size }) => {
  const renderIcon = () => {
    if (isActive || willBeActive) {
      return <StarActive width={size} height={size} />;
    }

    if (isActiveHalf) {
      return <StarHalf width={size} height={size} />;
    }

    if (isDisabled) {
      return <StarDisabled width={size} height={size} />;
    }

    return <StarDisabled width={size} height={size} />;
  };

  return <div>{renderIcon()}</div>;
};

Star.defaultProps = {
  size: "25px",
};

export default Star;
