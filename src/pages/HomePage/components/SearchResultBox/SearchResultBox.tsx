import SearchResult from "../SearchResult";
import { SearchResultBoxProps } from "./types";

const SearchResultBox = ({ searchResult }: SearchResultBoxProps) => {
  if (!searchResult) return false;
  const { Page, PageSize, TotalNumberOfResults, ResultItems } = searchResult;
  return (
    <div className="py-12 px-40">
      <h3>{`Showing ${Page}-${PageSize} of ${TotalNumberOfResults} ${
        TotalNumberOfResults > 1 ? "results" : "result"
      }`}</h3>

      <div className="mt-10 flex flex-col gap-10 max-w-4xl">
        {ResultItems.map((result) => (
          <SearchResult key={result.DocumentId} resultItem={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultBox;
