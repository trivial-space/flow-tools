import { Entity, Graph, PortType, Process } from 'tvs-flow/dist/lib/runtime-types';
export declare function createEntityTree(entities: {
    [id: string]: ProcessedGraphEntity;
}, separator?: string): any;
export declare type ProcessedGraphProcesses = Process & {
    reaction: boolean;
    entities: Array<{
        eid: string;
        type: PortType;
    }>;
};
export interface ProcessedGraphEntity extends Entity {
    name: string;
    namespace: string;
    processes: ProcessedGraphProcesses[];
}
export declare function processEntities(graph: Graph): {
    [id: string]: ProcessedGraphEntity;
};
export declare function getProcessesOfEntity(entity: Entity, graph: Graph): ProcessedGraphProcesses[];
