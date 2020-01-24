const Twitter = require('twitter');
const stopword = require('stopword');

interface Tweet {
  full_text: string;
  lang: string;
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

    console.log(tweets);

    const result = tweets.map(tweet =>
      stopword
        .removeStopwords(tweet.full_text.split(' '), stopword[tweet.lang])
        .join(' ')
    );

    return result;
  }
}

export default TwitterClient;
