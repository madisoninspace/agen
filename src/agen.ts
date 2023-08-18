import { Command } from 'commander';
import { Apron } from './msfs/apron.js';
import { downloadWay } from './osm/downloadWay.js';
import { Scenery } from './msfs/scenery.js';
import { parse } from './osm/parse.js';
import { version } from './version.js';

const program = new Command();
program
    .name('agen')
    .version(version)
    .description('Tool to create aprons for MSFS scenery using OpenStreetMap data.');

program
    .command('remote <id> <xml>')
    .description('Download a way from OpenStreetMap API.')
    .action(async (id: string, xml: string) => {
        console.log('Downloading way #' + id);

        const way = await downloadWay(id);
        const coords = await parse(way);
        console.log(coords);

        const document = await Scenery.openSceneryXml(xml);
        await Apron.checkAprons(document);
        await Apron.createApron(document, coords);

        await Scenery.saveSceneryXml(document, xml);

    });

program.parse();