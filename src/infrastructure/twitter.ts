const Twitter = require('twitter');

// a tweet has _lots_ of properties, but we only care about these.
interface Tweet {
  full_text: string;
  lang: string;
  id_str: string;
}

interface Credentials {
  consumer_key: string;
  consumer_secret: string;
  access_token_key: string;
  access_token_secret: string;
}

class TwitterClient {
  private client: any;

  public constructor(credentials: Credentials) {
    this.client = new Twitter(credentials);
  }

  public async search(term: string, maxResults: number = 100) {
    const MAX_RESULTS_PER_PAGE = 100;

    let tweets: Tweet[] = [];
    let done = false;
    let maxId = '';

    const getRequestCount = () => {
      const currentResultCount = tweets.length;

      let remainingResults = maxResults - currentResultCount;

      if (tweets.length > 0) {
        // we need this buffer to account for the 'max_id' duplicate tweet
        remainingResults += 1;
      }

      if (remainingResults > MAX_RESULTS_PER_PAGE) {
        return MAX_RESULTS_PER_PAGE;
      }

      return remainingResults;
    };

    try {
      while (!done) {
        let params: any = {
          tweet_mode: 'extended',
          q: term,
          count: getRequestCount(),
        };

        if (maxId !== '') {
          params = { ...params, max_id: maxId };
        }

        let result = await this.client.get('search/tweets.json', params);

        tweets = [
          ...tweets,
          ...result.statuses.filter((tweet: Tweet) => tweet.id_str !== maxId),
        ];

        maxId = result.statuses[result.statuses.length - 1].id_str;

        if (
          tweets.length >= maxResults ||
          result.statuses.length < params.count
        ) {
          done = true;
        }
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }

    return tweets;
  }
}

export default TwitterClient;
