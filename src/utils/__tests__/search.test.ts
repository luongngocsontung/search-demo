import { SearchResultResponse } from "@/types/search";
import { filterSearchResult, findKeywordIndexsInText } from "../search";
import * as searchUtils from "../search"; // Import the module

describe("findKeywordIndexsInText", () => {
  test("finds a single keyword in text", () => {
    expect(findKeywordIndexsInText("hello world", "hello")).toEqual([
      { BeginOffset: 0, EndOffset: 5 },
    ]);
  });

  test("finds multiple occurrences of a keyword", () => {
    expect(findKeywordIndexsInText("hello hello world", "hello")).toEqual([
      { BeginOffset: 0, EndOffset: 5 },
      { BeginOffset: 6, EndOffset: 11 },
    ]);
  });

  test("finds multiple different keywords", () => {
    expect(findKeywordIndexsInText("hello world test", "hello test")).toEqual([
      { BeginOffset: 0, EndOffset: 5 },
      { BeginOffset: 12, EndOffset: 16 },
    ]);
  });

  test("is case insensitive", () => {
    expect(findKeywordIndexsInText("Hello World", "hello")).toEqual([
      { BeginOffset: 0, EndOffset: 5 },
    ]);
  });

  test("ignores extra spaces in input", () => {
    expect(
      findKeywordIndexsInText("  hello    world  ", "hello world")
    ).toEqual([
      { BeginOffset: 2, EndOffset: 7 },
      { BeginOffset: 11, EndOffset: 16 },
    ]);
  });

  test("returns empty array if no match found", () => {
    expect(findKeywordIndexsInText("hello world", "notfound")).toEqual([]);
  });
});

describe("filterSearchResult", () => {
  let mockResult: SearchResultResponse;

  beforeAll(() => {
    mockResult = {
      TotalNumberOfResults: 2,
      Page: 1,
      PageSize: 10,
      ResultItems: [
        {
          DocumentId: "1",
          DocumentTitle: { Text: "Test title 1", Highlights: [] },
          DocumentExcerpt: { Text: "Test excerpt 1", Highlights: [] },
          DocumentURI: "https://example.com/1",
        },
        {
          DocumentId: "2",
          DocumentTitle: { Text: "No match here", Highlights: [] },
          DocumentExcerpt: { Text: "Another excerpt", Highlights: [] },
          DocumentURI: "https://example.com/2",
        },
      ],
    };
  });

  beforeEach(() => {
    jest.resetAllMocks(); // Reset mocks before each test
    jest
      .spyOn(searchUtils, "findKeywordIndexsInText")
      .mockImplementation((text) =>
        text.includes("Test") ? [{ BeginOffset: 0, EndOffset: 4 }] : []
      );
  });

  test("filters results based on keyword in title", () => {
    (findKeywordIndexsInText as jest.Mock).mockImplementation((text) =>
      text.includes("title") ? [{ BeginOffset: 0, EndOffset: 4 }] : []
    );

    const result = filterSearchResult(mockResult, "title");

    expect(result).toEqual({
      ...mockResult,
      ResultItems: [
        {
          DocumentId: "1",
          DocumentTitle: {
            Text: "Test title 1",
            Highlights: [{ BeginOffset: 0, EndOffset: 4 }],
          },
          DocumentExcerpt: {
            Text: "Test excerpt 1",
            Highlights: [],
          },
          DocumentURI: "https://example.com/1",
        },
      ],
    });
  });

  test("filters results based on keyword in excerpt", () => {
    (findKeywordIndexsInText as jest.Mock).mockImplementation((text) =>
      text.includes("excerpt 1") ? [{ BeginOffset: 5, EndOffset: 12 }] : []
    );

    const result = filterSearchResult(mockResult, "excerpt 1");

    expect(result).toEqual({
      ...mockResult,
      ResultItems: [
        {
          DocumentId: "1",
          DocumentTitle: {
            Text: "Test title 1",
            Highlights: [],
          },
          DocumentExcerpt: {
            Text: "Test excerpt 1",
            Highlights: [{ BeginOffset: 5, EndOffset: 12 }],
          },
          DocumentURI: "https://example.com/1",
        },
      ],
    });
  });

  test("returns null if no matches are found", () => {
    (findKeywordIndexsInText as jest.Mock).mockReturnValue([]);

    const result = filterSearchResult(mockResult, "Nonexistent");

    expect(result).toBeNull();
  });

  test("filters multiple items correctly", () => {
    (findKeywordIndexsInText as jest.Mock).mockImplementation((text) =>
      text.includes("excerpt") ? [{ BeginOffset: 0, EndOffset: 4 }] : []
    );

    const result = filterSearchResult(mockResult, "excerpt");

    expect(result).toEqual({
      ...mockResult,
      ResultItems: [
        {
          DocumentId: "1",
          DocumentTitle: {
            Text: "Test title 1",
            Highlights: [],
          },
          DocumentExcerpt: {
            Text: "Test excerpt 1",
            Highlights: [{ BeginOffset: 0, EndOffset: 4 }],
          },
          DocumentURI: "https://example.com/1",
        },
        {
          DocumentId: "2",
          DocumentTitle: { Text: "No match here", Highlights: [] },
          DocumentExcerpt: {
            Text: "Another excerpt",
            Highlights: [{ BeginOffset: 0, EndOffset: 4 }],
          },
          DocumentURI: "https://example.com/2",
        },
      ],
    });
  });
});
