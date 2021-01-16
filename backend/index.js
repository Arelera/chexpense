const app = require('./app');
const http = require('http');
const { PORT } = require('./config');

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
