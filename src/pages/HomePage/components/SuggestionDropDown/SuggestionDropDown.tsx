import { SuggestionDropDownProps } from "./types";

const SuggestionDropDown = ({
  suggestions,
  isOpen,
}: SuggestionDropDownProps) => {
  if (!isOpen) return false;

  return (
    <ul className="absolute top-14 left-0 right-0 py-2 bg-white shadow-main transition">
      {suggestions.map((suggestion, index) => (
        <li key={index} className="px-6 py-2">
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionDropDown;
