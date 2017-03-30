import { EntityRef } from "tvs-flow/dist/lib/utils/entity-reference";
export declare const viewBox: EntityRef<{
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    scale: number;
}>;
export declare const nodeState: EntityRef<any>;
export declare const saveNodeState: EntityRef<void>;
export declare const graphEntities: EntityRef<any>;
export declare const graphProcesses: EntityRef<any>;
export declare const viewData: EntityRef<{
    entities: any[];
    processes: any[];
    edges: any[];
}>;
