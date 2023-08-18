import fs from 'fs/promises';
import { DOMParser } from '@xmldom/xmldom';
import { Coordinate } from '../model/coordinate.js';
//import { Node } from '../model/node.js';

/**
 * Handles local node files.
 */
export class Local {
    /**
     * Load an OSM file from disk and return the <osm> element.
     * @param file - The path to the OSM file.
     * @return {Promise<Element>} The <osm> element.
     * @throws {Error} If the file could not be loaded.
     */
    public static async loadOsm(file: string): Promise<Element> {
        try {
            const data = await fs.readFile(file, 'utf-8');
            const parser = new DOMParser();
            const document = parser.parseFromString(data, 'application/xml');
            return document.documentElement;
        } catch (e) {
            throw new Error('Could not load OSM file.');
        }
    }

    /**
     * Get all coordinates from an OSM element.
     * @param osm - The <osm> element.
     * @returns {Promise<Coordinate[]>} An array of Coordinate objects.
     */
    public static async getCoordinates(osm: Element): Promise<Coordinate[]> {
        const nodes = osm.getElementsByTagName('node');
        const coords: Coordinate[] = [];

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes.item(i);
            if (!node) continue;

            const lat = node.getAttribute('lat');
            const lon = node.getAttribute('lon');

            if (!lat || !lon) continue;

            coords.push({
                lat: parseFloat(lat),
                lon: parseFloat(lon)
            });
        }

        return coords;
    }
}