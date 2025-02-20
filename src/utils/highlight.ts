import { SearchHighlight } from "@/types/search";
import { TextFormat } from "@/types/text";

/**
 * Given a text string and an array of highlight offsets, the function will identify highlighted text
 * within the text string. Split the text string into an array of substrings, each indicating text format "normal" or "bold"
 * @param text
 * @param highlights
 * @returns
 */
export const extractHighlightFromDocument = (
  text: string,
  highlights: SearchHighlight[]
): TextFormat[] => {
  if (!highlights || highlights.length === 0) return [{ text, type: "normal" }];

  const result: TextFormat[] = [];
  let currentIndex = 0;

  highlights.forEach(({ BeginOffset, EndOffset }) => {
    if (currentIndex < BeginOffset) {
      result.push({
        text: text.slice(currentIndex, BeginOffset),
        type: "normal",
      });
    }

    result.push({
      text: text.slice(BeginOffset, EndOffset),
      type: "bold",
    });

    currentIndex = EndOffset;
  });

  if (currentIndex < text.length - 1) {
    result.push({
      text: text.slice(currentIndex, text.length),
      type: "normal",
    });
  }

  return result;
};

/**
 * Given a text string and a keyword (search term), the function will identify substrings of text that match the keyword, which will then be highlighted.
 * Split the text string into an array of substrings, each indicating text format "normal" or "bold"
 * @param text
 * @param keyword
 * @returns
 */
export const extractHighlightByKeyword = (
  text: string,
  keyword: string
): TextFormat[] => {
  const normalizeKeyword = keyword.trim().toLocaleLowerCase();
  const result: TextFormat[] = [];

  let index = 0;

  while (index < text.length) {
    const indexOfKeyword = text.indexOf(normalizeKeyword, index);

    if (indexOfKeyword === -1) {
      if (index < text.length) {
        result.push({
          text: text.slice(index),
          type: "normal",
        });
      }
      break;
    }

    if (index < indexOfKeyword) {
      result.push({
        text: text.slice(index, indexOfKeyword),
        type: "normal",
      });
    }

    result.push({
      text: text.slice(
        indexOfKeyword,
        indexOfKeyword + normalizeKeyword.length
      ),
      type: "bold",
    });

    index = indexOfKeyword + normalizeKeyword.length;
  }

  return result;
};
