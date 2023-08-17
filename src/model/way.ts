import { WayElement } from './wayelement.js';

export interface Way {
    version: string
    generator: string
    copyright: string
    attribution: string
    license: string
    elements: WayElement[]
  }