const program = require('commander');
const api = require('./index.js');

program
  .command('add')
  .description('add a task')
  .action(command => {
    const words = command.args.join(' ');
    api.add(words);
    console.log('添加成功');
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear();
    console.log("清除成功")
  });

program.parse(process.argv);
