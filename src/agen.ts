import { Command } from 'commander';
import { version } from './version.js';

const program = new Command();
program
    .name('agen')
    .version(version)
    .description('Tool to create aprons for MSFS scenery using OpenStreetMap data.');

program.parse();