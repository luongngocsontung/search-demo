import { SearchResultResponse } from "@/types/search";

/**
 * Filters the search result items by checking if the document title includes the specified keyword.
 * The filter is case-insensitive.
 *
 * @param result The search result response containing items to be filtered.
 * @param keyword The keyword used to filter the document titles.
 * @returns The filtered search result response with items that match the keyword.
 */

export const filterSearchResult = (
  result: SearchResultResponse,
  keyword: string
): SearchResultResponse | null => {
  const filteredResult: SearchResultResponse = { ...result };

  filteredResult.ResultItems = filteredResult.ResultItems.filter(
    (resultItem) => {
      const idDocumentExcerptHasKeyword =
        resultItem.DocumentExcerpt.Text.toLowerCase().includes(
          keyword.toLowerCase()
        );

      const isDocumentTitleHasKeyword =
        resultItem.DocumentTitle.Text.toLowerCase().includes(
          keyword.toLowerCase()
        );

      return idDocumentExcerptHasKeyword || isDocumentTitleHasKeyword;
    }
  );

  // If filtered result is empty, return null
  if (!filteredResult.ResultItems.length) {
    return null;
  }

  return filteredResult;
};

/**
 * Filter search suggestions based on keyword and limit the number of results.
 * @param suggestions Array of search suggestions.
 * @param keyword Keyword to filter suggestions with.
 * @param limit Maximum number of results to return.
 * @returns Array of filtered search suggestions.
 */
export const filterSearchSuggestions = (
  suggestions: string[],
  keyword: string,
  limit: number
): string[] => {
  const result: string[] = [];

  for (let i = 0; i < suggestions.length; i++) {
    if (suggestions[i].toLowerCase().includes(keyword.toLowerCase())) {
      result.push(suggestions[i]);
      if (result.length === limit) break;
    }
  }

  return result;
};
