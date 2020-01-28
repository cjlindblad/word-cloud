const getWordCloud = async (searchTerm: string, tweetCount: number = 100) => {
  const url = `/word-cloud?searchTerm=${encodeURIComponent(
    searchTerm
  )}&tweetCount=${tweetCount}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Oops! Something went wrong! 😕');
  }

  return response.json();
};

export default {
  getWordCloud,
};
