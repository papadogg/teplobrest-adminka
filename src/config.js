module.exports = {
  endPoint:
    process.env.NODE_ENV === 'production'
      ? 'https://api.teplobrest.by/'
      : 'http://localhost:4000/',
};
