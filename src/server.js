const http = require("http");
const server = http.createServer((req, res) => {
  res.write("dsds");
  res.end();
});
server.listen(3001);
