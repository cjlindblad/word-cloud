import express = require('express');
import compression from 'compression';
import dotenv from 'dotenv';
import _ from 'lodash';

import cache from './cache';
import TwitterClient from '../infrastructure/twitter';
import {
  weightWords,
  removeStopWords,
  removeTwitterTerms,
  removeTrash,
} from '../core/wordService';

dotenv.config();

const app: express.Application = express();

app.use(compression());

app.get('/word-cloud', cache(60 * 60), async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;

    const twitterCredentials = {
      consumer_key: process.env.TW_CONSUMER_KEY || '',
      consumer_secret: process.env.TW_CONSUMER_SECRET || '',
      access_token_key: process.env.TW_ACCESS_TOKEN_KEY || '',
      access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET || '',
    };

    const twitterClient = new TwitterClient(twitterCredentials);

    const tweets = await twitterClient.search(searchTerm, 1000);

    let cleanedTweetText = tweets
      .map(tweet => removeStopWords(tweet.full_text.split(' '), tweet.lang))
      .reduce((result, tweet) => result.concat(tweet), [] as string[]);

    cleanedTweetText = removeTrash(cleanedTweetText);
    cleanedTweetText = removeTwitterTerms(cleanedTweetText);
    cleanedTweetText = cleanedTweetText.filter(
      word =>
        word.toLowerCase() !== searchTerm.toLowerCase() &&
        `#${word.toLowerCase()}` !== searchTerm.toLowerCase()
    );

    const weightedWords = _.shuffle(
      weightWords(cleanedTweetText.join(' '), 100)
    );

    res.json({
      wordCloud: weightedWords,
    });
  } catch (error) {
    return next(error);
  }
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});
