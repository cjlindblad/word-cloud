var Twitter = require('twitter');

interface Tweet {
  full_text: string;
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

  public async search(term: string) {
    const params = { tweet_mode: 'extended', q: term, count: 100 };
    let tweets: Tweet[];
    try {
      const result = await this.client.get('search/tweets.json', params);
      tweets = result.statuses;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }

    const result = tweets.map(tweet => tweet.full_text);

    return result;
  }
}

export default TwitterClient;
