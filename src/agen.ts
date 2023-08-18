import { Command } from 'commander';
import { Apron } from './msfs/apron.js';
import { downloadWay } from './osm/downloadWay.js';
import { Local } from './osm/localNode.js';
import { Scenery } from './msfs/scenery.js';
import { parseRemote } from './osm/parseremote.js';
import { version } from './version.js';

const program = new Command();
program
    .name('agen')
    .version(version)
    .description('Tool to create aprons for MSFS scenery using OpenStreetMap data.');

program
    .command('local <xml> <osm>')
    .description('Parse a local OSM file.')
    .action(async (xml: string, osm: string) => {
        const document = await Local.loadOsm(osm);
        const coords = await Local.getCoordinates(document);
        
        const fsdoc = await Scenery.openSceneryXml(xml);
        await Apron.checkAprons(fsdoc);
        await Apron.createApron(fsdoc, coords);

        await Scenery.saveSceneryXml(fsdoc, xml);
    });

program
    .command('remote <xml> <id>')
    .description('Download a way from OpenStreetMap API.')
    .action(async (id: string, xml: string) => {
        console.log('Downloading way #' + id);

        const way = await downloadWay(id);
        const coords = await parseRemote(way);
        console.log(coords);

        const document = await Scenery.openSceneryXml(xml);
        await Apron.checkAprons(document);
        await Apron.createApron(document, coords);

        await Scenery.saveSceneryXml(document, xml);
    });

program.parse();