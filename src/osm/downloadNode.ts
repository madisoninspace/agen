import axios from 'axios';
import { Node } from '../model/node.js';

/**
 * Downloads a node from OpenStreetMap API by its ID.
 * @param id - The ID of the node to download.
 * @returns A Promise that resolves with the downloaded Node object.
 * @throws An error if the download fails.
 */
export async function downloadNode(id: string): Promise<Node> {
    const baseUrl = 'https://www.openstreetmap.org/api/0.6/node/';
    const url = baseUrl + id + '.json';
    
    const response = await axios.get(url);
    if (response.status !== 200) {
        throw new Error('Download failed');
    }

    return response.data as Node;
}