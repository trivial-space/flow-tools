import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { PartialUIWindow } from '../../types';
export interface Size {
    width: number;
    height: number;
}
export interface Position {
    top: number;
    left: number;
}
export declare type WindowDimension = Position & Size;
export declare const metaTreeWindow: EntityRef<PartialUIWindow>;
export declare const metaGraphWindow: EntityRef<PartialUIWindow>;
export declare const metaEntityWindow: EntityRef<PartialUIWindow>;
export declare const visibility: EntityRef<{
    tree: boolean;
    graph: boolean;
    entity: boolean;
}>;
export declare const activeWindow: EntityRef<string>;
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
export declare const entityWindow: EntityRef<{
    top: number;
    left: number;
    width: number;
    height: number;
    zIndex: number;
}>;
