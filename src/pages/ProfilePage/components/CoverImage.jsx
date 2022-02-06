function CoverImage({ image }) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "150px",
      }}
    />
  );
}

export default CoverImage;
