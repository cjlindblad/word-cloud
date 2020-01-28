// a tweet has _lots_ of properties, but we only care about these.
export interface Tweet {
  full_text: string;
  lang: string;
  id_str: string;
}

export interface TwitterClient {
  search(term: string, maxResults: number): Promise<Tweet[]>;
}
