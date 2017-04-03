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
export declare const treeViewProps: EntityRef<{
    treeViewComponent: string;
}>;
export declare const treeFold: EntityRef<{}>;
export declare const treeData: EntityRef<{
    fold: any;
    tree: any;
}>;
export declare const treeWindowProps: EntityRef<{
    dimensions: any;
    props: any;
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
export declare const activeEntity: EntityRef<{}>;
export declare const activeProcess: EntityRef<{}>;
export declare const activeNode: EntityRef<{}>;
export declare const watchingEntity: EntityRef<boolean>;
export declare const activeValue: EntityRef<{}>;
export declare const editedValue: EntityRef<string>;
export declare const entityView: EntityRef<{
    value: any;
    watching: any;
}>;
export declare const entitiesWindowProps: EntityRef<{
    dimensions: any;
    node: any;
}>;
export declare const entityViewProps: EntityRef<{
    entity: any;
    watching: any;
}>;
export declare const controlProps: EntityRef<{
    visibility: any;
    position: any;
}>;
