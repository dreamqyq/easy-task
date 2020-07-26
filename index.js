const program = require('commander');

program
  .command('add')
  .description('add a task')
  .action(command => {
    console.log(command.args.join(' '));
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    console.log('clear fn');
  });

program.parse(process.argv);
