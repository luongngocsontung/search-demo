import { SearchResultItem } from "@/types/search";
import { render, screen } from "@testing-library/react";
import SearchResult from "./";

// Mock the `extractHighlightFromDocument` utility function
vi.mock("@/utils/highlight", () => ({
  extractHighlightFromDocument: vi.fn(() => ["Mocked highlighted text"]),
}));

// Mock the `HighlightText` component to isolate the test
vi.mock("@/components/HighlightText", () => ({
  __esModule: true,
  default: ({ texts }: { texts: string[] }) => (
    <span data-testid="highlight-text">{texts.join(" ")}</span>
  ),
}));

const mockSearchResult: SearchResultItem = {
  DocumentId: "123",
  DocumentTitle: {
    Text: "Test Document Title",
    Highlights: [],
  },
  DocumentExcerpt: {
    Text: "This is a test excerpt.",
    Highlights: [{ BeginOffset: 10, EndOffset: 14 }],
  },
  DocumentURI: "https://example.com",
};

describe("SearchResult Component", () => {
  test("renders document title as a link", () => {
    render(<SearchResult resultItem={mockSearchResult} />);

    const titleLink = screen.getByRole("link", {
      name: /Test Document Title/i,
    });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", "https://example.com");
  });

  test("calls extractHighlightFromDocument and passes result to HighlightText", () => {
    render(<SearchResult resultItem={mockSearchResult} />);

    expect(screen.getByTestId("highlight-text")).toHaveTextContent(
      "Mocked highlighted text"
    );
  });

  test("renders document URI as a link", () => {
    render(<SearchResult resultItem={mockSearchResult} />);

    const uriLink = screen.getAllByRole("link", {
      name: /https:\/\/example\.com/i,
    });
    expect(uriLink).toHaveLength(1);
    uriLink.forEach((link) => {
      expect(link).toHaveAttribute("href", "https://example.com");
    });
  });
});
