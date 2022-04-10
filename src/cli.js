import { Command } from 'commander';
import pageLoader from '../index.js';

export default () => {
  const program = new Command();

  program
    .description('Page loader utility')
    .version('0.0.1')
    .argument('<url>')
    .option('-o, --output [dir]', 'output dir (default: "/home/user/current-dir")')
    .action((link, { output }) => {
      pageLoader(link, output)
        .then((path) => console.log(path));
    })
    .parse(process.argv);
};
