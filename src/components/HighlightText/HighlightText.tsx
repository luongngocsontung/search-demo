import { HighlightTextProps } from "./types";

const HighlightText = ({ texts }: HighlightTextProps) => {
  return (
    <>
      {texts.map(({ text, type }, index) => (
        <span key={index} className={type === "bold" ? "font-semibold" : ""}>
          {text}
        </span>
      ))}
    </>
  );
};

export default HighlightText;
