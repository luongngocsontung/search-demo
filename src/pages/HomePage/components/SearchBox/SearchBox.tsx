import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { fetchSearchSuggestion } from "@/apis/search-apis";
import SuggestionDropDown from "../SuggestionDropDown";
import Close from "@/assets/svgs/close.svg?react";
import Search from "@/assets/svgs/search.svg?react";

const START_SEARCHING_INPUT_LENGTH = 2;

const SearchBox = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const isSuggestionDisplayed = useMemo(
    () =>
      suggestions.length > 0 &&
      isFocused &&
      searchValue.length >= START_SEARCHING_INPUT_LENGTH,
    [suggestions, isFocused, searchValue]
  );

  const handleSearching = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    getSuggestions(value);

    /**
     * Reset suggestions when user input less than `START_SEARCHING_INPUT_LENGTH` characters
     * This is to prevent showing old suggestions when user is typing more than 2 characters
     */
    if (value.length < START_SEARCHING_INPUT_LENGTH) {
      setSuggestions([]);
    }
  };

  const getSuggestions = debounce((searchInput) => {
    // Only call API when user input more than `START_SEARCHING_INPUT_LENGTH` characters
    if (searchInput.length < START_SEARCHING_INPUT_LENGTH) return;

    fetchSearchSuggestion(searchInput).then(({ error, data }) => {
      if (error) {
        console.error(error);
      } else if (data) {
        setSuggestions(data);
      }
    });
  }, 300);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent reload page
    e.preventDefault();
  };

  const handleClearInput = () => {
    setSearchValue("");
    setSuggestions([]);
  };

  return (
    <div className="py-12 px-40 shadow-main sticky top-0 bg-white">
      <form
        className={`flex items-center h-14 rounded-[9px] border-1 ${
          isFocused ? "border-primary rounded-bl-none" : "border-[#A4A4A4]"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmit={handleSearch}
      >
        <div className="grow h-full flex items-center pl-6 pr-4 relative">
          <input
            className="grow h-full focus:outline-0"
            value={searchValue}
            onChange={handleSearching}
          />

          <button
            type="button"
            className={`p-0 ${searchValue.length >= 2 ? "block" : "hidden"}`}
            onClick={handleClearInput}
          >
            <Close />
          </button>

          <SuggestionDropDown
            suggestions={suggestions}
            isOpen={isSuggestionDisplayed}
          />
        </div>

        <button
          className={
            "bg-primary rounded-[8px] h-full text-white font-semibold flex items-center gap-1.5"
          }
        >
          <Search />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
