import { SearchHighlight, SearchResultResponse } from "@/types/search";

/**
 * Finds all occurrences of the keyword in the given text and returns an array
 * of SearchHighlight objects that represent the start and end indices of the
 * keyword in the text.
 *
 * @param text The text to search for the keyword
 * @param keyword The keyword to search for
 * @returns An array of SearchHighlight objects representing the occurrence of
 * the keyword in the text
 */
export const findKeywordIndexsInText = (
  text: string,
  keyword: string
): SearchHighlight[] => {
  const normalizedText = text.toLowerCase();
  // Split keyword by space and normalize to lowercase
  const normalizedKeywords = keyword
    .trim()
    .split(" ")
    .filter((k) => !!k)
    .map((k) => k.toLowerCase());

  const result: SearchHighlight[] = [];

  // Find keywords in text
  for (const keyword of normalizedKeywords) {
    let startIndex = 0;
    // Find all occurrences of the keyword
    while (normalizedText.indexOf(keyword, startIndex) !== -1) {
      const index = normalizedText.indexOf(keyword, startIndex);
      result.push({ BeginOffset: index, EndOffset: index + keyword.length });
      startIndex = index + keyword.length;
    }
  }

  // Sort by BeginOffset
  result.sort((a, b) => a.BeginOffset - b.BeginOffset);

  return result;
};

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
      const highlightedKeywordsInDocumentTitle: SearchHighlight[] =
        findKeywordIndexsInText(resultItem.DocumentTitle.Text, keyword);

      const highlightedKeywordsInDocumentExcerpt: SearchHighlight[] =
        findKeywordIndexsInText(resultItem.DocumentExcerpt.Text, keyword);

      // Return false if both document title and document excerpt don't contain the keyword
      if (
        !highlightedKeywordsInDocumentTitle.length &&
        !highlightedKeywordsInDocumentExcerpt.length
      ) {
        return false;
      }

      resultItem.DocumentTitle.Highlights = highlightedKeywordsInDocumentTitle;
      resultItem.DocumentExcerpt.Highlights =
        highlightedKeywordsInDocumentExcerpt;

      return true;
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
