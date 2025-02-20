export interface SearchHighlight {
  BeginOffset: number;
  EndOffset: number;
}

export interface SearchResultItem {
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

export interface SearchResultResponse {
  TotalNumberOfResults: number;
  Page: number;
  PageSize: number;
  ResultItems: SearchResultItem[];
}

export interface SearchSuggestionResponse {
  stemmedQueryTerm: string;
  suggestions: string[];
}
