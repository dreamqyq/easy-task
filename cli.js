const program = require('commander');
const api = require('./index.js');

program
  .command('add')
  .description('add a task')
  .action(command => {
    const words = command.args.join(' ');
    api.add(words);
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear();
  });

program.parse(process.argv);
