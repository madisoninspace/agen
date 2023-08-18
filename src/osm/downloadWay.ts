import axios from 'axios';
import { Way } from '../model/way.js';

/**
 * Downloads a way from OpenStreetMap API.
 * @param id - The ID of the way to download.
 * @returns A Promise that resolves with the downloaded Way object.
 * @throws An error if the download fails.
 */
export async function downloadWay(id: string): Promise<Way> {
    const baseUrl = 'https://www.openstreetmap.org/api/0.6/way/';
    const url = baseUrl + id + '.json';
    
    const response = await axios.get(url);
    if (response.status !== 200) {
        throw new Error('Download failed');
    }

    return response.data as Way;
}