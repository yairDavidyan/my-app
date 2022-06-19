const http = require("http");
const fsp = require("fs/promises");
http
  .createServer((req, res) => {
    fsp.readFile("en.txt", "utf8", (err, enWord) => {
      const en = enWord;
      fsp.readFile("translations.json", "utf8", (err, resTransaltions) => {
        const transaltionsArr = JSON.parse(resTransaltions);
        const resSearch = transaltionsArr.find((word) => word.en === en);
        if (resSearch) {
          fsp.writeFile("he.txt", resSearch.he, (err) => {
            res.end("success");
          });
        } else {
          res.end("no found");
        }
      });
    });
  })
  .listen(8080);
