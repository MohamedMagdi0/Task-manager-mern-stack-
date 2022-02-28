const fs = require("fs");
const json = require("./todos.json");

module.exports = {
  loadJSON: function () {
    return new Promise((resolve, reject) => {
      fs.readFile("data/todos.json", (err, data) => {
        if (err) reject(err);
        let todoLists = JSON.parse(data);
        resolve(todoLists);
      });
    });
  },

  saveJSON: function (json = '""') {
    return fs.writeFileSync("data/todos.json", JSON.stringify(json, null, 2));
  },
};
