import HighlightText from "@/components/HighlightText";
import { SuggestionDropDownProps } from "./types";
import { extractHighlightByKeyword } from "@/utils/highlight";

const SuggestionDropDown = ({
  suggestions,
  keyword,
  isOpen,
  suggestionSeletedIndex,
  setSuggestionSeletedIndex,
  handleOnSearch,
}: SuggestionDropDownProps) => {
  const handleOnSelectSuggestion = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    keyword: string
  ) => {
    // Only perform search when user click left mouse
    if (e.button !== 0) return;
    handleOnSearch(keyword);
  };

  if (!isOpen) return false;

  return (
    <ul
      className={`absolute top-14 left-0 right-0 py-2 bg-white shadow-main transition`}
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className={`px-6 py-2 cursor-pointer ${
            suggestionSeletedIndex === index ? " bg-slate-100" : ""
          }`}
          onMouseEnter={() => {
            setSuggestionSeletedIndex(index);
          }}
          onMouseLeave={() => {
            setSuggestionSeletedIndex(-1);
          }}
          onMouseDown={(e) => handleOnSelectSuggestion(e, suggestion)}
        >
          <HighlightText
            texts={extractHighlightByKeyword(suggestion, keyword)}
          />
        </li>
      ))}
    </ul>
  );
};

export default SuggestionDropDown;
