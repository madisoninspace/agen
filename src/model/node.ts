import { NodeElement } from './nodeelement.js';

export interface Node {
    version: string
    generator: string
    copyright: string
    attribution: string
    license: string
    elements: NodeElement[]
  }