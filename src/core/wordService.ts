import stopword from 'stopword';

interface WeightedWord {
  word: string;
  count: number;
}

export const weightWords = (sentence: string) => {
  const countByWord: { [word: string]: number } = {};

  sentence
    .split(' ')
    .map(word => word.toLowerCase())
    .forEach(word => {
      if (!countByWord[word]) {
        countByWord[word] = 0;
      }

      countByWord[word] += 1;
    });

  const result: WeightedWord[] = Object.entries(countByWord)
    .map(entry => ({
      word: entry[0],
      count: entry[1],
    }))
    .sort((a, b) => b.count - a.count);

  return result;
};

export const removeStopWords = (input: string[], lang: string) => {
  const result = stopword.removeStopwords(input, (stopword as any)[lang]);

  return result;
};
