import { render, screen, fireEvent } from "@testing-library/react";
import SuggestionDropDown from "../SuggestionDropDown";

// Mock dependencies
vi.mock("@/components/HighlightText", () => ({
  default: ({ texts }: { texts: { text: string; type: string }[] }) => (
    <span data-testid="highlight-text">
      {texts.map(({ text }) => text).join("")}
    </span>
  ),
}));

vi.mock("@/components/Spinner", () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe("SuggestionDropDown", () => {
  const mockSetSuggestionSeletedIndex = vi.fn();
  const mockHandleOnSearch = vi.fn();
  const suggestions = ["apple", "banana", "cherry"];
  const keyword = "a";

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <SuggestionDropDown
        suggestions={suggestions}
        keyword={keyword}
        isOpen={false}
        suggestionSeletedIndex={-1}
        setSuggestionSeletedIndex={mockSetSuggestionSeletedIndex}
        handleOnSearch={mockHandleOnSearch}
        isLoading={false}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders suggestions when isOpen is true", () => {
    render(
      <SuggestionDropDown
        suggestions={suggestions}
        keyword={keyword}
        isOpen={true}
        suggestionSeletedIndex={-1}
        setSuggestionSeletedIndex={mockSetSuggestionSeletedIndex}
        handleOnSearch={mockHandleOnSearch}
        isLoading={false}
      />
    );

    expect(screen.getByText("apple")).toBeInTheDocument();
    expect(screen.getByText("banana")).toBeInTheDocument();
    expect(screen.getByText("cherry")).toBeInTheDocument();
  });

  it("highlights the selected suggestion on hover", () => {
    render(
      <SuggestionDropDown
        suggestions={suggestions}
        keyword={keyword}
        isOpen={true}
        suggestionSeletedIndex={-1}
        setSuggestionSeletedIndex={mockSetSuggestionSeletedIndex}
        handleOnSearch={mockHandleOnSearch}
        isLoading={false}
      />
    );

    const firstSuggestion = screen.getByText("apple");

    fireEvent.mouseEnter(firstSuggestion);
    expect(mockSetSuggestionSeletedIndex).toHaveBeenCalledWith(0);

    fireEvent.mouseLeave(firstSuggestion);
    expect(mockSetSuggestionSeletedIndex).toHaveBeenCalledWith(-1);
  });

  it("calls handleOnSearch when a suggestion is clicked", () => {
    render(
      <SuggestionDropDown
        suggestions={suggestions}
        keyword={keyword}
        isOpen={true}
        suggestionSeletedIndex={-1}
        setSuggestionSeletedIndex={mockSetSuggestionSeletedIndex}
        handleOnSearch={mockHandleOnSearch}
        isLoading={false}
      />
    );

    const firstSuggestion = screen.getByText("apple");
    fireEvent.mouseDown(firstSuggestion, { button: 0 });

    expect(mockHandleOnSearch).toHaveBeenCalledWith("apple");
  });

  it("shows the loading spinner when isLoading is true", () => {
    render(
      <SuggestionDropDown
        suggestions={suggestions}
        keyword={keyword}
        isOpen={true}
        suggestionSeletedIndex={-1}
        setSuggestionSeletedIndex={mockSetSuggestionSeletedIndex}
        handleOnSearch={mockHandleOnSearch}
        isLoading={true}
      />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByText("apple")).not.toBeInTheDocument();
  });
});
