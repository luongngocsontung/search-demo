export interface SuggestionDropDownProps {
  suggestions: string[];
  keyword: string;
  isOpen: boolean;
  suggestionSeletedIndex: number;
  setSuggestionSeletedIndex: (index: number) => void;
  handleOnSearch: (keyword: string) => void;
}
