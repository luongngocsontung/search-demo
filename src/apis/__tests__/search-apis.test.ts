import { filterSearchResult, filterSearchSuggestions } from "@/utils/search";
import { SEARCH_API_ENDPOINT, SUGGESTION_API_ENDPOINT } from "@/constants/api";
import { MAX_SEARCH_SUGGESTION_COUNT } from "@/constants/search";
import { fetchSearchResult, fetchSearchSuggestion } from "../search-apis";
import { Mock } from "vitest";

vi.mock("@/utils/search", () => ({
  filterSearchResult: vi.fn(),
  filterSearchSuggestions: vi.fn(),
}));

describe("fetchSearchResult", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null data if keyword is empty", async () => {
    const result = await fetchSearchResult("");
    expect(result).toEqual({ error: null, data: null });
  });

  it("should fetch search results and filter them", async () => {
    const mockResponse = { TotalNumberOfResults: 5, ResultItems: [] };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    ) as unknown as typeof fetch;

    const mockFilteredResults = { TotalNumberOfResults: 2, ResultItems: [] };
    (filterSearchResult as Mock).mockReturnValue(mockFilteredResults);

    const result = await fetchSearchResult("test");

    expect(fetch).toHaveBeenCalledWith(SEARCH_API_ENDPOINT);
    expect(filterSearchResult).toHaveBeenCalledWith(mockResponse, "test");
    expect(result).toEqual({ error: null, data: mockFilteredResults });
  });

  it("should return error if fetch fails", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.reject(new Error("Network error"))
    ) as unknown as typeof fetch;

    const result = await fetchSearchResult("test");

    expect(result).toEqual({ error: new Error("Network error"), data: null });
  });
});

describe("fetchSearchSuggestion", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch search suggestions and filter them", async () => {
    const mockResponse = {
      stemmedQueryTerm: "test",
      suggestions: ["test1", "test2"],
    };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    ) as unknown as typeof fetch;

    const mockFilteredSuggestions = ["test1"];
    (filterSearchSuggestions as Mock).mockReturnValue(mockFilteredSuggestions);

    const result = await fetchSearchSuggestion("test");

    expect(fetch).toHaveBeenCalledWith(SUGGESTION_API_ENDPOINT);
    expect(filterSearchSuggestions).toHaveBeenCalledWith(
      mockResponse.suggestions,
      "test",
      MAX_SEARCH_SUGGESTION_COUNT
    );
    expect(result).toEqual({ error: null, data: mockFilteredSuggestions });
  });

  it("should return error if fetch fails", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.reject(new Error("Network error"))
    ) as unknown as typeof fetch;

    const result = await fetchSearchSuggestion("test");

    expect(result).toEqual({ error: new Error("Network error"), data: null });
  });
});
