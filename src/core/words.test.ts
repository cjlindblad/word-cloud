import { weightWords, removeTwitterTerms } from './words';

describe('word service', () => {
  it('weights a simple sentence correctly', () => {
    // gibberish to make expected test result
    // simpler to reason about
    const input = 'To be or not to be or to be to';

    const result = weightWords(input);

    expect(result).toEqual([
      { word: 'to', count: 4, weight: 1 },
      { word: 'be', count: 3, weight: 0.75 },
      { word: 'or', count: 2, weight: 0.5 },
      { word: 'not', count: 1, weight: 0.25 },
    ]);
  });

  it('removes "RT" from tweets', () => {
    const input = 'RT some tweet from some other handle';

    const result = removeTwitterTerms(input.split(' ')).join(' ');

    expect(result).toBe('some tweet from some other handle');
  });

  it('removes twitter handles', () => {
    const input = '@DHH created Ruby on Rails';

    const result = removeTwitterTerms(input.split(' ')).join(' ');

    expect(result).toBe('created Ruby on Rails');
  });
});
