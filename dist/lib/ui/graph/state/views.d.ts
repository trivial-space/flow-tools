import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
export declare const entityWindowProps: EntityRef<any>;
export declare const controlProps: EntityRef<{
    visibility: {
        tree: boolean;
        graph: boolean;
        entity: boolean;
    };
    position: {
        left: number;
        top: number;
        zIndex: number;
    };
}>;
export declare const treeWindowProps: EntityRef<{
    dimensions: {
        top: number;
        left: number;
        width: number;
        height: number;
        zIndex: number;
    };
    window: string;
}>;
export declare const graphWindowProps: EntityRef<{
    dimensions: {
        top: number;
        left: number;
        width: number;
        height: number;
        zIndex: number;
    };
    window: string;
}>;
