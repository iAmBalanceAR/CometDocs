#!/usr/bin/env node
import { Command } from 'commander';
import { setup } from './scripts/setup';

const program = new Command();

program
  .name('create-cometdocs')
  .description('CLI tool for setting up CometDocs in your Next.js project')
  .version('0.1.4')
  .action(() => {
    setup();
  });

program.parse(); 