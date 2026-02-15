exports.handler = async (event, context) => {
  const API_KEY = process.env.TMDB_API_KEY;

  const page = event.queryStringParameters.page || 1;

  const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch celebrities" }),
    };
  }
};
