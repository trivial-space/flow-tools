import { EntityRef } from "tvs-flow/dist/lib/utils/entity-reference";
export interface Size {
    width: number;
    height: number;
}
export interface Position {
    top: number;
    left: number;
}
export declare type WindowDimension = Position & Size;
export declare const title: EntityRef<string>;
export declare const visibility: EntityRef<{
    tree: boolean;
    graph: boolean;
    entities: boolean;
}>;
export declare const activeWindow: EntityRef<any>;
export declare const zIndex: EntityRef<number>;
export declare const controlsPosition: EntityRef<{
    left: number;
    top: number;
    zIndex: number;
}>;
export declare const treeWindow: EntityRef<{
    top: number;
    left: number;
    width: number;
    height: number;
    zIndex: number;
}>;
export declare const graphWindow: EntityRef<{
    top: number;
    left: number;
    width: number;
    height: number;
    zIndex: number;
}>;
export declare const entitiesWindow: EntityRef<{
    top: number;
    left: number;
    width: number;
    height: number;
    zIndex: number;
}>;
