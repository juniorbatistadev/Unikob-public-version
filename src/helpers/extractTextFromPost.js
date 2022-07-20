import { convert } from "html-to-text";

export default function extractTextFromPost(blocks, limit) {
  const text = [];

  const getText = (element) => {
    switch (element.type) {
      case "paragraph":
        return element.data.text;
      case "header":
        return element.data.text;
      case "quote":
        return element.data.text;
      case "code":
        return element.data.code;
      default:
        return element?.data?.text ? element.data.text : " ";
    }
  };

  blocks?.map((element) => {
    return text.push(getText(element));
  });

  const textWithHtml = text.join(" ");

  const textExtracted = convert(textWithHtml, {
    limits: { maxInputLength: limit },
  });

  return textExtracted;
}
