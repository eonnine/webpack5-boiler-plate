const SCHEME = 'http';
const HOST = 'localhost';
const PORT = 8080;

module.exports = {
  API_SERVER: {
    SCHEME,
    HOST,
    PORT,
    URL: `${SCHEME}://${HOST}:${PORT}`,
  },
};
