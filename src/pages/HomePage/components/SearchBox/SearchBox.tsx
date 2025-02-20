import { useState } from "react";
import Close from "@/assets/svgs/close.svg?react";

const SearchBox = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearching = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="py-12 px-40 shadow-main">
      <form
        className={`flex items-center gap-3 h-14 rounded-[8px] pl-6 outline-1 ${
          isFocused ? "outline-primary rounded-bl-none" : "outline-[#A4A4A4]"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <div className="grow h-full flex items-center">
          <input
            className="grow h-full focus:outline-0"
            value={searchValue}
            onChange={handleSearching}
          />

          <button className="p-0">
            <Close />
          </button>
        </div>

        <button
          className={"bg-primary rounded-[8px] h-full text-white font-semibold"}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
