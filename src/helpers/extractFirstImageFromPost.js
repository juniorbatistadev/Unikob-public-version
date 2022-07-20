export default function extractFirstImageFromPost(blocks, withoutHTML) {
  let imageUrl;

  blocks?.some((item) => {
    if (item.type === "image") {
      imageUrl = item.data.url;
      return true;
    }
  });

  return imageUrl;
}
