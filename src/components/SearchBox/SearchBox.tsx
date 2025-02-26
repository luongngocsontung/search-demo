import { useEffect, useRef, useState } from "react";
import { fetchSearchSuggestion } from "@/apis/search-apis";
import SuggestionDropDown from "../SuggestionDropDown";
import Close from "@/assets/svgs/close.svg?react";
import Search from "@/assets/svgs/search.svg?react";
import { SearchBoxProps } from "./types";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { QueryParams } from "@/constants/param";

const START_SEARCHING_INPUT_LENGTH = 2;

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [searchParams, setSearchParams] = useQueryParams(QueryParams.SEARCH);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionSeletedIndex, setSuggestionSeletedIndex] = useState(-1);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const isSuggestionDisplayed =
    suggestions.length > 0 &&
    isFocused &&
    searchValue.length >= START_SEARCHING_INPUT_LENGTH;

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    /**
     * Reset suggestions when user input less than `START_SEARCHING_INPUT_LENGTH` characters
     * This is to prevent showing old suggestions when user is typing more than 2 characters
     */
    if (searchValue.length < START_SEARCHING_INPUT_LENGTH) {
      setSuggestions([]);
      setSuggestionSeletedIndex(-1);
    }
  };

  const handleSearch = (keyword: string) => {
    // Sync search value with URL
    setSearchParams(keyword);

    // Unfocus search box
    setIsFocused(false);
    searchInputRef.current?.blur();

    // Update search value state when user perform search with suggestion
    setSearchValue(keyword);

    onSearch(keyword);
  };

  const handleClearInput = () => {
    setSearchValue("");
    setSuggestions([]);
    handleSearch("");
  };

  const handleOnSearch = (keyword: string) => {
    handleSearch(keyword);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // If user enter when suggestion is selected then search the selected suggestion
      if (
        suggestionSeletedIndex >= 0 &&
        suggestionSeletedIndex < suggestions.length
      ) {
        handleOnSearch(suggestions[suggestionSeletedIndex]);
      } else {
        handleOnSearch(searchValue);
      }
    }
    // Only perform keyboard navigation when suggestions are displayed
    if (!isSuggestionDisplayed) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSuggestionSeletedIndex((prev) => {
        if (prev >= suggestions.length - 1) return -1;
        return prev + 1;
      });
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSuggestionSeletedIndex((prev) => {
        if (prev <= -1) return suggestions.length - 1;
        return prev - 1;
      });
    }
  };

  // Reset selected index when suggestion is not displayed
  useEffect(() => {
    if (!isSuggestionDisplayed) {
      setSuggestionSeletedIndex(-1);
    }
  }, [isSuggestionDisplayed]);

  useEffect(() => {
    // Only call API when user input more than `START_SEARCHING_INPUT_LENGTH` characters
    if (debouncedSearchValue.length < START_SEARCHING_INPUT_LENGTH) return;

    fetchSearchSuggestion(debouncedSearchValue).then(({ error, data }) => {
      if (error) {
        console.error(error);
      }
      if (data) {
        setSuggestions(data);
      }
    });
  }, [debouncedSearchValue]);

  return (
    <div className="py-12 px-40 shadow-main sticky top-0 bg-white">
      <form
        className={`flex items-center h-14 rounded-[9px] border-1 ${
          isFocused ? "border-primary rounded-bl-none" : "border-[#A4A4A4]"
        }`}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grow h-full flex items-center pl-6 pr-4 relative">
          <input
            ref={searchInputRef}
            className="grow h-full focus:outline-0"
            value={searchValue}
            autoFocus
            onChange={handleOnInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleOnKeyDown}
          />

          <button
            type="button"
            className={`p-0 ${!!searchValue.length ? "block" : "hidden"}`}
            onClick={handleClearInput}
          >
            <Close />
          </button>

          <SuggestionDropDown
            keyword={searchValue}
            suggestions={suggestions}
            isOpen={isSuggestionDisplayed}
            suggestionSeletedIndex={suggestionSeletedIndex}
            setSuggestionSeletedIndex={setSuggestionSeletedIndex}
            handleOnSearch={handleOnSearch}
          />
        </div>

        <button
          type="submit"
          className={
            "bg-primary rounded-[8px] h-full text-white font-semibold flex items-center gap-1.5"
          }
          onClick={() => handleOnSearch(searchValue)}
        >
          <Search />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
