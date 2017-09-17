import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { Runtime, Graph } from 'tvs-flow/dist/lib/runtime-types';
import { UIMeta, PartialUIMetaEntity, PartialUIMetaTree, PartialUIMetaGraph, MetaEntitiesUI } from '../../types';
export declare const runtimes: EntityRef<{
    [id: string]: Runtime;
}>;
export declare const selectedRuntimeId: EntityRef<string>;
export declare const runtime: EntityRef<Runtime>;
export declare const meta: EntityRef<UIMeta>;
export declare const metaGraph: EntityRef<PartialUIMetaGraph>;
export declare const metaTree: EntityRef<PartialUIMetaTree>;
export declare const metaEntity: EntityRef<PartialUIMetaEntity>;
export declare const metaEntities: EntityRef<{
    [id: string]: {
        ui?: MetaEntitiesUI;
    };
}>;
export declare const graph: EntityRef<Graph>;
export declare const state: EntityRef<{
    [id: string]: any;
}>;
