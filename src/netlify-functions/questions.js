export const handler = async (event, context) => {
  try {
    const questions = await import('../data/questions.json').then(
      q => q.default
    );

    return {
      statusCode: 200,
      body: JSON.stringify(questions),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
