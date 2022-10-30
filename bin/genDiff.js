#!/usr/bin/env node
import { Command } from 'commander';
import {getDiff} from '../src/getDiff.js'


const program = new Command();



program.description('Compares two configuration files and shows a difference.');
program.version('output the version number');
program.option('-f, --format <type>','output format');
program.arguments('<file1> <file2>');

program.action((file1,file2)=>{
console.log(getDiff(file1,file2))
})
   
     
program.parse(process.argv);
