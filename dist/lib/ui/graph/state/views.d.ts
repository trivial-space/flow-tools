import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { ProcessedGraph, ProcessedGraphEntity, ProcessedGraphProcess } from '../../../utils/entity-data-helpers';
export declare const entityWindowProps: EntityRef<any>;
export declare const controlProps: EntityRef<any>;
export declare const treeWindowProps: EntityRef<any>;
export declare const graphWindowProps: EntityRef<any>;
export declare const entityViewProps: EntityRef<{
    entity: ProcessedGraphEntity;
    value: any;
    watching: boolean;
    graph: ProcessedGraph;
    meta: any;
}>;
export declare const processViewProps: EntityRef<{
    process: ProcessedGraphProcess;
    graph: ProcessedGraph;
}>;
