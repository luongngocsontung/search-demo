import { SearchHighlight } from "@/types/search";
import {
  extractHighlightByKeyword,
  extractHighlightFromDocument,
} from "../highlight";

describe("extractHighlightFromDocument", () => {
  test("should return full text with type=normal if no highlights are provided", () => {
    // Arrange
    const text =
      "HPB Introduces BMI-for-Age Charts to Monitor Physical Growth and Development in Children and Youth";
    const noHighlights: SearchHighlight[] = [];

    // Act
    const textArrs = extractHighlightFromDocument(text, noHighlights);

    // Assert
    expect(textArrs).toHaveLength(1);
    expect(textArrs[0].text).toBe(text);
    expect(textArrs[0].type).toBe("normal");
  });

  test("should return an array of subtext with type=normal and type=bold if there is a highlight offset", () => {
    // Arrange
    const text = "Choose a Child Care Centre";
    const highlights: SearchHighlight[] = [
      {
        BeginOffset: 9,
        EndOffset: 14,
      },
    ];

    // Act
    const textArrs = extractHighlightFromDocument(text, highlights);

    // Assert
    expect(textArrs).toHaveLength(3);
    expect(textArrs[0].text).toBe("Choose a ");
    expect(textArrs[0].type).toBe("normal");
    expect(textArrs[1].text).toBe("Child");
    expect(textArrs[1].type).toBe("bold");
    expect(textArrs[2].text).toBe(" Care Centre");
    expect(textArrs[2].type).toBe("normal");
  });
});

describe("extractHighlightByKeyword", () => {
  test("should return full text with type=normal if no matching keyword", () => {
    // Arrange
    const text = "Child care";
    const keyword = "test";

    // Act
    const textArrs = extractHighlightByKeyword(text, keyword);

    // Assert
    expect(textArrs).toHaveLength(1);
    expect(textArrs[0].text).toBe(text);
    expect(textArrs[0].type).toBe("normal");
  });

  test("should return an array of subtexts with type=normal and type=bold if there is a matching keyword", () => {
    // Arrange
    const text = "Child vaccination";
    const keyword = "vac";

    // Act
    const textArrs = extractHighlightByKeyword(text, keyword);

    // Assert
    expect(textArrs).toHaveLength(3);
    expect(textArrs[0].text).toBe("Child ");
    expect(textArrs[0].type).toBe("normal");
    expect(textArrs[1].text).toBe("vac");
    expect(textArrs[1].type).toBe("bold");
    expect(textArrs[2].text).toBe("cination");
    expect(textArrs[2].type).toBe("normal");
  });
});
