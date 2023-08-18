import { DOMParser } from '@xmldom/xmldom';
import fs from 'fs/promises';

export class Scenery {
    /**
     * Open an MSFS scenery XML file and return the XML document.
     * @param {string} path - The path to the XML file.
     * @returns {Promise<Document>} A Promise that resolves with the XML document.
     */
    public static async openSceneryXml(path: string): Promise<Document> {
        const file = await fs.readFile(path, 'utf-8');
        const parser = new DOMParser();
        const doc = parser.parseFromString(file, 'text/xml');

        return doc;
    }

    /**
     * Save an MSFS scenery XML document to a file.
     * @param {Document} document - The XML document to save.
     * @param {string} path - The path to the XML file.
     */
    public static async saveSceneryXml(document: Document, path: string): Promise<void> {
        const xml = document.toString();
        await fs.writeFile(path, xml);
    }
}