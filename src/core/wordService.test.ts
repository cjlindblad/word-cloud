import { weightWords } from './wordService';

describe('word service', () => {
  it('weights a simple sentence correctly', () => {
    // gibberish to make expected test result simpler
    // to reason about
    const input = 'To be or not to be or to be to';

    const result = weightWords(input);

    expect(result).toEqual([
      { word: 'to', count: 4, weight: 1 },
      { word: 'be', count: 3, weight: 0.75 },
      { word: 'or', count: 2, weight: 0.5 },
      { word: 'not', count: 1, weight: 0.25 },
    ]);
  });
});
