const { program } = require('commander');
const api = require('./index.js');

program
  .command('add')
  .description('add a task')
  .action(command => {
    const words = command.args.join(' ');
    api
      .add(words)
      .then(() => {
        console.log('添加成功');
      })
      .catch(() => {
        console.log('添加失败');
      });
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api
      .clear()
      .then(() => {
        console.log('清除成功');
      })
      .catch(() => {
        console.log('清除失败');
      });
  });

if (process.argv.length === 2) {
  // 说明用户直接运行 node cli.js
  void api.showAll();
} else {
  program.parse(process.argv);
}
