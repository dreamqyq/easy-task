const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const p = require('path');
const fs = require('fs');
const dbPath = p.join(home, '.todo');

module.exports.add = title => {
  fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      let list;
      try {
        list = JSON.parse(data.toString());
      } catch (error2) {
        list = [];
      }
      list.push({
        title,
        done: false
      });
      fs.writeFile(dbPath, JSON.stringify(list) + '\n', error3 => {
        if (error3) {
          console.log(error3);
        }
      });
    }
  });
};

module.exports.clear = () => {
  fs.writeFile(dbPath, '[]', error => {
    if (error) {
      console.log(error);
    }
  });
};
