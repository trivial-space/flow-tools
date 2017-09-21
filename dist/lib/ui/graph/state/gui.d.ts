import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { PartialUIWindow, Position, Area } from '../../types';
export interface Size {
    width: number;
    height: number;
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
export declare const controlsPosition: EntityRef<Position>;
export declare const treeWindow: EntityRef<Area>;
export declare const graphWindow: EntityRef<Area>;
export declare const entityWindow: EntityRef<Area>;
