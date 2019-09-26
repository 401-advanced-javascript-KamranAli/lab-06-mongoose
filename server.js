require('dotenv').config();
const app = require('./lib/app');

require('./lib/connect')(process.env.MONGODB_URI);

const { createServer } = require('http');
const server = createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});