import express = require('express');
import compression from 'compression';
import dotenv from 'dotenv';

import cache from './cache';
import TwitterClient from '../infrastructure/twitter';
import { getTwitterWordCloud } from '../core/app';

dotenv.config();

const twitterClient = new TwitterClient({
  consumer_key: process.env.TW_CONSUMER_KEY || '',
  consumer_secret: process.env.TW_CONSUMER_SECRET || '',
  access_token_key: process.env.TW_ACCESS_TOKEN_KEY || '',
  access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET || '',
});

const app: express.Application = express();

app.use(compression());

app.get('/word-cloud', cache(60 * 60), async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;
    const tweetCount = req.query.tweetCount;

    const wordCloud = await getTwitterWordCloud(
      twitterClient,
      searchTerm,
      tweetCount
    );

    res.json({
      wordCloud,
    });
  } catch (error) {
    return next(error);
  }
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});
