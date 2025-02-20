interface SearchHighlight {
  BeginOffset: number;
  EndOffset: number;
}

interface SearchResultItem {
  DocumentId: string;
  DocumentTitle: {
    Text: string;
    Highlights: SearchHighlight[];
  };
  DocumentExcerpt: {
    Text: string;
    Highlights: SearchHighlight[];
  };
  DocumentURI: string;
}

export interface SearchResult {
  TotalNumberOfResults: number;
  Page: number;
  PageSize: number;
  ResultItems: SearchResultItem[];
}

export interface SearchSuggestion {
  stemmedQueryTerm: string;
  suggestions: string[];
}
