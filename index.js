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

function askForCreateTask(list) {
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

function markAsDone(list, index) {
  list[index].done = true;
  db.write(list);
}

function markAsUndone(list, index) {
  list[index].done = false;
  db.write(list);
}

function updateTitle(list, index) {
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
}

function remove(list, index) {
  list.splice(index, 1);
  db.write(list);
}

const showAllThen = (answer, list) => {
  const index = parseInt(answer.index);
  const actions = { markAsDone, markAsUndone, updateTitle, remove };
  if (index >= 0) {
    inquirer
      .prompt({
        type: 'list',
        name: 'action',
        message: 'Please select the operation!',
        choices: [
          { name: 'exit', value: 'exit' },
          { name: 'mark as done', value: 'markAsDone' },
          { name: 'mark as undone', value: 'markAsUndone' },
          { name: 'update task title', value: 'updateTitle' },
          { name: 'remove task', value: 'remove' }
        ]
      })
      .then(answer => {
        const action = actions[answer.action];
        action && action(list, index);
      });
  } else if (index === -2) {
    askForCreateTask(list);
  }
};

function printTasks(list) {
  const isHasTask = list.length > 0;
  inquirer
    .prompt({
      type: 'list',
      name: 'index',
      message: isHasTask
        ? 'Which task do you want to choose?'
        : "You haven't created any task yet, please create it first!",
      choices: [
        { name: 'exit', value: '-1' },
        ...list.map((task, index) => {
          return {
            name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`,
            value: index.toString()
          };
        }),
        { name: '+ add a task', value: '-2' }
      ]
    })
    .then(answer => {
      showAllThen(answer, list);
    });
}

module.exports.showAll = async () => {
  const list = await db.read();
  printTasks(list);
};
