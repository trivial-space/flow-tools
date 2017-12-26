import { Entity, Graph, PortType, Process } from 'tvs-flow/dist/lib/runtime-types';
export declare function createEntityTree(entities: {
    [id: string]: ProcessedGraphEntity;
}, separator?: string): any;
export declare type ProcessedGraphProcess = Process & {
    reaction: boolean;
    name: string;
    namespace: string;
    output: string;
    inputs: Array<{
        eid: string;
        type: PortType;
    }>;
};
export interface ProcessedGraphEntity extends Entity {
    name: string;
    namespace: string;
    processes: string[];
}
export interface ProcessedGraph {
    processes: {
        [id: string]: ProcessedGraphProcess;
    };
    entities: {
        [id: string]: ProcessedGraphEntity;
    };
}
export declare function processGraph(graph: Graph): ProcessedGraph;
export declare function printEntityName(e: ProcessedGraphEntity | ProcessedGraphProcess): string;
