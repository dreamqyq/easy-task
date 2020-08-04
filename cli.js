#!/usr/bin/env node
const { program } = require("commander");
const api = require("./index.js");
program.version(require('./package.json').version)

program
  .command("add")
  .description("add a task")
  .action((command) => {
    const words = command.args.join(" ");
    api
      .add(words)
      .then(() => {
        console.log("add success!");
      })
      .catch(() => {
        console.log("add failed, please try again!");
      });
  });

program
  .command("clear")
  .description("clear all tasks")
  .action(() => {
    api
      .clear()
      .then(() => {
        console.log("clear success!");
      })
      .catch(() => {
        console.log("clear failed, please try again!");
      });
  });

if (process.argv.length === 2) {
  // 说明用户直接运行 node cli.js
  void api.showAll();
} else {
  program.parse(process.argv);
}
