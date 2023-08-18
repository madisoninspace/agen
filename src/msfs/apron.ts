import { Coordinate } from '../model/coordinate.js';

export class Apron {
    /**
     * Check if an <Aprons> element exists in the scenery XML document.
     * If not, create one.
     * @param {Document} document - The XML document.
     */
    public static async checkAprons(document: Document): Promise<void> {
        const aprons = document.getElementsByTagName('Aprons');
        if (aprons.length === 0) {
            console.log('No Aprons element found. Creating one.');

            const scenery = document.getElementsByTagName('Airport')[0];
            const apronsElement = document.createElement('Aprons');
            scenery.appendChild(apronsElement);
        } else {
            console.log('Aprons element found.');
        }
    }

    /**
     * Create an <Apron> element in the scenery XML document.
     * Adds <Vertex> elements from the given coordinates.
     * @param {Document} document - The XML document.
     * @param {Coordinate[]} coords - The coordinates to add.
     */
    public static async createApron(document: Document, coords: Coordinate[]): Promise<void> {
        const aprons = document.getElementsByTagName('Aprons')[0];
        const apron = document.createElement('Apron');
        apron.setAttribute('surface', 'ASPHALT');
        aprons.appendChild(apron);

        for (const coord of coords) {
            const vertex = document.createElement('Vertex');
            vertex.setAttribute('lat', coord.lat.toString());
            vertex.setAttribute('lon', coord.lon.toString());
            apron.appendChild(vertex);
        }
    }
}