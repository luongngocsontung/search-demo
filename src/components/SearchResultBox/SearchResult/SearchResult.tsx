import { extractHighlightFromDocument } from "@/utils/highlight";
import { SearchResultProps } from "./types";
import HighlightText from "@/components/HighlightText";

const SearchResult = ({ resultItem }: SearchResultProps) => {
  const { DocumentTitle, DocumentExcerpt, DocumentURI } = resultItem;
  return (
    <div className="flex flex-col gap-3">
      <a className="text-primary text-[22px] font-semibold" href={DocumentURI}>
        {DocumentTitle.Text}
      </a>
      <p>
        <HighlightText
          texts={extractHighlightFromDocument(
            DocumentExcerpt.Text,
            DocumentExcerpt.Highlights
          )}
        />
      </p>
      <a className="text-ghost" href={DocumentURI}>
        {DocumentURI}
      </a>
    </div>
  );
};

export default SearchResult;
