const http = require("http");
const fsp = require("fs/promises");
http
  .createServer((req, res) => {
    fsp
      .readFile("./en.txt", "utf-8")
      .then((wordEn) => {
        fsp
          .readFile("translations.json", "utf-8")
          .then((trans) => {
            const tJson = JSON.parse(trans);
            const tWord = tJson.find((word) => word.en === wordEn);
            if (tWord) {
              fsp.writeFile("he.txt", tWord.he, (err) => {});
              res.end("success");
            } else {
              res.end("not found");
            }
          })
          .catch((err) => res.end("not found"));
      })
      .catch((err) => res.end("not found"));
  })
  .listen(8080);
