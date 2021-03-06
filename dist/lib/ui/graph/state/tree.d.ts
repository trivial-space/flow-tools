import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { Entity } from 'tvs-flow/dist/lib/runtime-types';
export declare const entityTree: EntityRef<{}>;
export declare const treeData: EntityRef<{
    fold: {
        [path: string]: boolean;
    };
    tree: {};
    selected: Entity | null;
}>;
