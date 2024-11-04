const fs = require("fs");

fs.readFile("./some.csv", "utf-8", (err, data) => {
  if (err) console.log(err);
  const arr = data.split(";");
  arr.map((el) => console.log(el));
});
