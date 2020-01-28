const getWordCloud = async (searchTerm: string) => {
  const url = `/word-cloud?searchTerm=${encodeURIComponent(searchTerm)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Något gick fel! 😕');
  }

  return response.json();
};

export default {
  getWordCloud,
};
