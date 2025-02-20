import { SEARCH_API_ENDPOINT, SUGGESTION_API_ENDPOINT } from "@/constants/api";
import { MAX_SEARCH_SUGGESTION_COUNT } from "@/constants/search";
import { SearchResult, SearchSuggestion } from "@/types/search";
import { filterSearchSuggestions } from "@/utils/search";

export const fetchSearchResult = async (keyword: string) => {
  try {
    const response = await fetch(SEARCH_API_ENDPOINT);

    const data: SearchResult = await response.json();

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
};

/**
 * Call API to fetch search suggestions based on keyword
 * Mock filtering is implemented by only returning up to 6 search suggestions
 * that contain the keyword
 * @param keyword search keyword
 * @returns an object with error and data properties; data is an array of strings
 * if successful, or null if an error occurs; error is an error message if an
 * error occurs, or null if successful
 */
export const fetchSearchSuggestion = async (
  keyword: string
): Promise<{ error: unknown; data: string[] | null }> => {
  try {
    const response = await fetch(SUGGESTION_API_ENDPOINT);

    const data: SearchSuggestion = await response.json();
    const suggestions = filterSearchSuggestions(
      data.suggestions,
      keyword,
      MAX_SEARCH_SUGGESTION_COUNT
    );

    return { error: null, data: suggestions };
  } catch (error) {
    return { error, data: null };
  }
};
