const table = require("table").table;
const fs = require("fs");
// const { table } = require("console");

let data = [
  ["0A", "0B", "0C"],
  ["1A", "1B", "1C"],
  ["2A", "2B"]
];

let output = table(data);
console.log(output);

fs.writeFile("tabledata.txt", output, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
