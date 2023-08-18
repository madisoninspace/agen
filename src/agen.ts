import { Command } from 'commander';
import { downloadWay } from './osm/downloadWay.js';
import { parse } from './osm/parse.js';
import { version } from './version.js';

const program = new Command();
program
    .name('agen')
    .version(version)
    .description('Tool to create aprons for MSFS scenery using OpenStreetMap data.');

program
    .command('remote <id>')
    .description('Download a way from OpenStreetMap API.')
    .action(async (id: string) => {
        console.log('Downloading way #' + id);

        const way = await downloadWay(id);
        const coords = await parse(way);

        console.log(coords);
    });

program.parse();