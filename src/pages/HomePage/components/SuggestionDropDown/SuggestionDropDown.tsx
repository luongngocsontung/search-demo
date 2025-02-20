import HighlightText from "@/components/HighlightText";
import { SuggestionDropDownProps } from "./types";
import { extractHighlightByKeyword } from "@/utils/highlight";

const SuggestionDropDown = ({
  suggestions,
  keyword,
  isOpen,
}: SuggestionDropDownProps) => {
  if (!isOpen) return false;

  return (
    <ul className="absolute top-14 left-0 right-0 py-2 bg-white shadow-main transition">
      {suggestions.map((suggestion, index) => (
        <li key={index} className="px-6 py-2">
          <HighlightText
            texts={extractHighlightByKeyword(suggestion, keyword)}
          />
        </li>
      ))}
    </ul>
  );
};

export default SuggestionDropDown;
