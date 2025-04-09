import { Command } from 'commander';
import { setup } from './scripts/setup';

const program = new Command();

program
  .name('create-cometdocs')
  .description('CLI tool for setting up CometDocs in your Next.js project')
  .version('0.1.6')
  .action(async () => {
    try {
      await setup();
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  });

program.parse(); 