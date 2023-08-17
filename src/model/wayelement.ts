import { Tags } from './tags.js';

export interface WayElement {
    type: string
    id: number
    timestamp: string
    version: number
    changeset: number
    user: string
    uid: number
    nodes: number[]
    tags: Tags
  }