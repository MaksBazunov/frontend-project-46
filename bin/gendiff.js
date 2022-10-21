#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();
 
program.description('Compares two configuration files and shows a difference.');
program.version('output the version number');
program.option('-f, --format <type>','output format');
program.arguments('<filepath1> <filepath2>')
program.parse(process.argv);
