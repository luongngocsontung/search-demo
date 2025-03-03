import { render, screen } from "@testing-library/react";
import SearchResultBox from "@/components/SearchResultBox";
import { SearchResultResponse } from "@/types/search";

// Mock SearchResult component to isolate SearchResultBox testing
vi.mock("./SearchResult", () => ({
  default: vi.fn(() => <div data-testid="search-result-item">Result Item</div>),
}));

describe("SearchResultBox Component", () => {
  const mockSearchResult: SearchResultResponse = {
    Page: 1,
    PageSize: 10,
    TotalNumberOfResults: 2,
    ResultItems: [
      {
        DocumentId: "1",
        DocumentTitle: {
          Text: "First Search Result",
          Highlights: [{ BeginOffset: 0, EndOffset: 5 }],
        },
        DocumentExcerpt: {
          Text: "This is an excerpt from the first result.",
          Highlights: [{ BeginOffset: 11, EndOffset: 18 }],
        },
        DocumentURI: "https://example.com/1",
      },
      {
        DocumentId: "2",
        DocumentTitle: {
          Text: "Second Search Result",
          Highlights: [{ BeginOffset: 7, EndOffset: 13 }],
        },
        DocumentExcerpt: {
          Text: "Another excerpt for the second result.",
          Highlights: [{ BeginOffset: 9, EndOffset: 15 }],
        },
        DocumentURI: "https://example.com/2",
      },
    ],
  };

  test("renders correctly with search results", () => {
    render(<SearchResultBox searchResult={mockSearchResult} />);

    // Check if header displays correct number of results
    expect(screen.getByText("Showing 1-10 of 2 results")).toBeInTheDocument();

    // Check if SearchResult items are rendered
    expect(screen.getAllByTestId("search-result-item")).toHaveLength(2);
  });

  test("does not render when searchResult is null", () => {
    const { container } = render(<SearchResultBox searchResult={null} />);
    expect(container.firstChild).toBeNull();
  });
});
