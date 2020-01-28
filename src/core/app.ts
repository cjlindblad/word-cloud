import _ from 'lodash';

import {
  weightWords,
  removeStopWords,
  removeTwitterTerms,
  removeTrash,
} from '../core/words';
import { Tweet, TwitterClient } from './interfaces';

export const getTwitterWordCloud = async (
  client: TwitterClient,
  searchTerm: string,
  tweetCount: number = 100
) => {
  const MAX_TWEET_COUNT = 1000;
  const tweets = await client.search(
    searchTerm,
    tweetCount > MAX_TWEET_COUNT ? MAX_TWEET_COUNT : tweetCount
  );

  const cleanedTwitterWords = tweetsToCleanWords(tweets, searchTerm);

  const wordCloud = _.shuffle(weightWords(cleanedTwitterWords.join(' '), 100));

  return wordCloud;
};

const tweetsToCleanWords = (tweets: Tweet[], searchTerm: string) => {
  let cleanedWords = tweets
    .map(tweet => removeStopWords(tweet.full_text.split(/[\s,]+/), tweet.lang))
    .reduce((result, tweet) => result.concat(tweet), [] as string[]);

  cleanedWords = removeTrash(cleanedWords);
  cleanedWords = removeTwitterTerms(cleanedWords);
  cleanedWords = cleanedWords.filter(
    word =>
      word.toLowerCase() !== searchTerm.toLowerCase() &&
      `#${word.toLowerCase()}` !== searchTerm.toLowerCase()
  );

  return cleanedWords;
};
