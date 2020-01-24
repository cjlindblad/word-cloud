import express = require('express');

import TwitterClient from '../infrastructure/twitter';
import { weightWords } from '../core/wordService';

import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();

app.use(express.json());

app.get('/test', function(req, res) {
  res.json([
    {
      result: 'test data',
    },
  ]);
});

app.post('/word-cloud', async function(req, res) {
  const searchTerm = req.body.searchTerm;

  const twitterCredentials = {
    consumer_key: process.env.TW_CONSUMER_KEY || '',
    consumer_secret: process.env.TW_CONSUMER_SECRET || '',
    access_token_key: process.env.TW_ACCESS_TOKEN_KEY || '',
    access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET || '',
  };

  const twitterClient = new TwitterClient(twitterCredentials);

  const tweets = await twitterClient.search(searchTerm);

  const weightedWords = weightWords(tweets.join(' '));

  const result = weightedWords.slice(0, 100);

  res.json({
    wordCloud: result,
  });
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});
