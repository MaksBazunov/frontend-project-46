#!/usr/bin/env node
import { Command } from 'commander';
import {genDiff} from '../src/genDiff.js'


const program = new Command();



program.description('Compares two configuration files and shows a difference.');
program.version('output the version number');
program.option('-f, --format <type>','output format');
program.arguments('<file1> <file2>');

program.action(genDiff)
   
     
program.parse(dsgsd);
