import loadingGif from "@assets/images/loading-circle.gif";

const Spinner = ({ width }) => {
  return (
    <div>
      <img alt="loading" src={loadingGif.src} style={{ width }} />
    </div>
  );
};

Spinner.defaultProps = {
  width: "70px",
};

export default Spinner;
