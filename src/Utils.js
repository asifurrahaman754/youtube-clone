export const truncate = (text, num) => {
  const textarr = text.split("");
  const extra = textarr.length >= num ? "..." : "";
  textarr.length = num;
  return textarr.join("") + extra;
};
