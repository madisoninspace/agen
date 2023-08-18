import progress from 'cli-progress';
import { downloadNode } from './downloadNode.js';
import { NodeElement } from '../model/nodeelement.js';
import { Way } from '../model/way.js';
import { Coordinate } from '../model/coordinate.js';

/**
 * Parses a Way object and returns an array of Coordinate objects.
 * @param way - The Way object to parse.
 * @returns An array of Coordinate objects.
 */
export async function parseRemote(way: Way): Promise<Coordinate[]> {
    const nodes: NodeElement[] = [];
    const coords: Coordinate[] = [];
    
    if (way.elements.length === 1) {
        const wayNodes = way.elements[0].nodes;

        const bar = new progress.SingleBar({
            format: 'Parsing nodes |' + '{bar}' + '| {percentage}% || {value}/{total} nodes',
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true
        });

        bar.start(wayNodes.length, 0);

        for (let i = 0; i < wayNodes.length; i++) {
            const node = await downloadNode(wayNodes[i].toString());
            nodes.push(node.elements[0]);
            bar.update(i + 1);
        }

        bar.stop();
    }

    for (const node of nodes) {
        coords.push({
            lat: node.lat,
            lon: node.lon
        });
    }

    return coords;
}