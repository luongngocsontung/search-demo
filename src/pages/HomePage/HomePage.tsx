import { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox";
import SearchResultBox from "../../components/SearchResultBox";
import { fetchSearchResult } from "@/apis/search-apis";
import { SearchResultResponse } from "@/types/search";
import { useSearchParams } from "react-router-dom";
import Spinner from "@/components/Spinner";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState<SearchResultResponse | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);

  const onSearch = async (keyword: string) => {
    setIsSearching(true);
    const result = await fetchSearchResult(keyword);
    if (result.error) {
      console.error(result.error);
    } else if (result.data) {
      setSearchResult(result.data);
    } else {
      setSearchResult(null);
    }
    setIsSearching(false);
  };

  /**
   * Call API to fetch search result when user navigates to this page
   */
  useEffect(() => {
    const keyword = searchParams.get("search");
    if (!keyword) return;

    onSearch(keyword);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <SearchBox onSearch={onSearch} />
      {isSearching ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <SearchResultBox searchResult={searchResult} />
      )}
    </div>
  );
};

export default HomePage;
