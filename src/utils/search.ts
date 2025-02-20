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
    if (suggestions[i].includes(keyword)) {
      result.push(suggestions[i]);
      if (result.length === limit) break;
    }
  }

  return result;
};
