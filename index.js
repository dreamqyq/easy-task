const db = require('./db');
const inquirer = require('inquirer');

module.exports.add = async title => {
  const list = await db.read();
  list.push({ title, done: false });
  await db.write(list);
};

module.exports.clear = async () => {
  await db.write([]);
};

const showAllThen = (answer, list) => {
  const index = parseInt(answer.index);
  if (index >= 0) {
    inquirer
      .prompt({
        type: 'list',
        name: 'action',
        message: 'Please select the operation!',
        choices: [
          { name: 'exit', value: 'exit' },
          { name: 'mark ad done', value: 'markAsDone' },
          { name: 'mars as undone', value: 'markAsUndone' },
          { name: 'update task title', value: 'updateTitle' },
          { name: 'remove task', value: 'remove' },
        ]
      })
      .then(answer => {
        switch (answer.action) {
          case 'markAsDone':
            list[index].done = true;
            db.write(list);
            break;
          case 'markAsUndone':
            list[index].done = false;
            db.write(list);
            break;
          case 'updateTitle':
            inquirer
              .prompt({
                type: 'input',
                name: 'title',
                message: 'input new title',
                default: list[index].title
              })
              .then(inputAnswer => {
                list[index].title = inputAnswer.title;
                db.write(list);
              });
            break;
          case 'remove':
            list.splice(index, 1);
            db.write(list);
            break;
        }
      });
  } else if (index === -2) {
    inquirer
      .prompt({
        type: 'input',
        name: 'title',
        message: 'input task title'
      })
      .then(inputAnswer => {
        list.push({
          title: inputAnswer.title,
          done: false
        });
        db.write(list);
      });
  }
};

module.exports.showAll = async () => {
  const list = await db.read();
  if (list.length > 0) {
    inquirer
      .prompt({
        type: 'list',
        name: 'index',
        message: 'Which task do you want to choose?',
        choices: [
          { name: 'exit', value: '-1' },
          ...list.map(
            (task, index) => {
              return {
                name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${
                  task.title
                }`,
                value: index.toString()
              };
            },
            { name: '+ add a task', value: '-2' }
          )
        ]
      })
      .then(answer => {
        showAllThen(answer, list);
      });
  } else {
    inquirer
      .prompt({
        type: 'list',
        name: 'index',
        message: "You haven't created any task yet, please create it first!",
        choices: [
          { name: 'exit', value: '-1' },
          { name: '+ add a task', value: '-2' }
        ]
      })
      .then(answer => {
        showAllThen(answer, list);
      });
  }
};
