import { weightWords } from './wordService';

describe('word service', () => {
  it('weights a simple sentence correctly', () => {
    // gibberish to make test result simpler
    const input = 'To be or not to be or to be to';

    const result = weightWords(input);

    expect(result).toEqual([
      { word: 'to', count: 4 },
      { word: 'be', count: 3 },
      { word: 'or', count: 2 },
      { word: 'not', count: 1 },
    ]);
  });
});
