import stopword from 'stopword';

interface WeightedWord {
  word: string;
  count: number;
  weight: number;
}

export const weightWords = (input: string, maxWordCount: number = 100) => {
  const countByWord = input
    .split(' ')
    .map(word => word.toLowerCase())
    .reduce((result, word) => {
      if (!result[word]) {
        result[word] = 0;
      }

      result[word] += 1;

      return result;
    }, {} as { [word: string]: number });

  const words: WeightedWord[] = Object.entries(countByWord)
    .map(entry => ({
      word: entry[0],
      count: entry[1],
      weight: 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, maxWordCount);

  const wordCounts = words.map(word => word.count);
  const largestWordCount = Math.max(...wordCounts);

  const weightedWords = words.map(word => ({
    ...word,
    weight: word.count / largestWordCount,
  }));

  return weightedWords;
};

export const removeStopWords = (input: string[], lang: string) => {
  const result = stopword.removeStopwords(input, (stopword as any)[lang]);

  return result;
};

export const removeTwitterTerms = (input: string[]) => {
  const RETWEET = /rt/;
  const HANDLE = /@.+/;

  const twitterTerms = [RETWEET, HANDLE];

  return input.filter(word => {
    for (const term of twitterTerms) {
      if (word.toLowerCase().match(term)) {
        return false;
      }
    }

    return true;
  });
};
