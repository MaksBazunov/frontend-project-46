#!/usr/bin/env node
import { Command } from 'commander';
import getDiff from '../src/getDiff.js'


const program = new Command();



program.description('Compares two configuration files and shows a difference.');
program.version('output the version number');
program.option('-f, --format <type>', 'output format', 'stylish')
program.arguments('<filepath1> <filepath2>');

program.action((filepath1,filepath2,options)=>{
console.log(getDiff(filepath1,filepath2,options.format))
})
   
     
program.parse();
