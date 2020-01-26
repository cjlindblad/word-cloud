import express = require('express');
import memoryCache from 'memory-cache';
import dotenv from 'dotenv';
import _ from 'lodash';

import TwitterClient from '../infrastructure/twitter';
import {
  weightWords,
  removeStopWords,
  removeTwitterTerms,
} from '../core/wordService';

dotenv.config();

// adopted from https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
const cache = (duration: number) => {
  return (req: any, res: any, next: any) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cachedBody = memoryCache.get(key);

    if (cachedBody) {
      res.send(cachedBody);
      return;
    }

    res.sendResponse = res.send;
    res.send = (body: any) => {
      memoryCache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  };
};

const app: express.Application = express();

app.use(express.json());

app.get('/word-cloud', cache(60 * 60), async (req, res) => {
  const searchTerm = req.query.searchTerm;

  const twitterCredentials = {
    consumer_key: process.env.TW_CONSUMER_KEY || '',
    consumer_secret: process.env.TW_CONSUMER_SECRET || '',
    access_token_key: process.env.TW_ACCESS_TOKEN_KEY || '',
    access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET || '',
  };

  const twitterClient = new TwitterClient(twitterCredentials);

  const tweets = await twitterClient.search(searchTerm, 100);

  // TODO clean this one up..
  const cleanedTweetText = tweets
    .map(tweet =>
      removeStopWords(
        removeTwitterTerms(
          tweet.full_text
            .trim()
            .split(' ')
            .filter(word => word.length > 0)
            .filter(word => word.toLowerCase() !== searchTerm.toLowerCase())
        ),
        tweet.lang
      ).join(' ')
    )
    .join(' ');

  const weightedWords = _.shuffle(weightWords(cleanedTweetText, 100));

  res.json({
    wordCloud: weightedWords,
  });
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});
