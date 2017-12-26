export interface Position {
    top: number;
    left: number;
}
export interface Area extends Position {
    width: number;
    height: number;
}
export interface UIWindow {
    visible: boolean;
    area: Area;
}
export interface PartialUIWindow {
    visible?: boolean;
    area?: Partial<Area>;
}
export interface GraphViewBox {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    scale: number;
}
export declare const graphDefaultViewBox: GraphViewBox;
export interface UIMetaGraph {
    viewBox: GraphViewBox;
    window: UIWindow;
}
export interface PartialUIMetaGraph {
    viewBox?: Partial<GraphViewBox>;
    window?: PartialUIWindow;
}
export declare enum EntityViewMode {
    DETAILS = "details",
    VALUE = "value",
}
export interface UIEntityProperties {
    activeEntityId: string;
    activeProcessId: string;
    watchingEntity: boolean;
    viewMode: EntityViewMode;
}
export interface UIMetaEntity extends UIEntityProperties {
    window: UIWindow;
}
export interface PartialUIMetaEntity extends Partial<UIEntityProperties> {
    window?: PartialUIWindow;
}
export interface UIMetaTree {
    fold: {
        [path: string]: boolean;
    };
    window: UIWindow;
}
export interface PartialUIMetaTree {
    fold?: {
        [path: string]: boolean;
    };
    window?: PartialUIWindow;
}
export interface MetaEntitiesUI {
    graph?: {
        position?: {
            x: number;
            y: number;
        };
        visible?: boolean;
    };
}
export interface UIMetaControls {
    position?: Position;
}
export interface UIMeta {
    name?: string;
    ui?: {
        entity?: PartialUIMetaEntity;
        graph?: PartialUIMetaGraph;
        tree?: PartialUIMetaTree;
        controls?: UIMetaControls;
        activeWindow?: string;
    };
    entities?: {
        [id: string]: {
            ui?: MetaEntitiesUI;
        };
    };
}
export interface MetaFlow {
    setMeta: (meta: UIMeta) => UIMeta;
    getMeta: () => UIMeta;
}
export declare const defaultUIMeta: UIMeta;
export declare const metaGuards: {
    ui: {
        entity: {
            window: {
                area: {
                    top: (val: number) => number;
                    left: (val: number) => number;
                    width: (val: number) => number;
                    height: (val: number) => number;
                };
            };
        };
        graph: {
            window: {
                area: {
                    top: (val: number) => number;
                    left: (val: number) => number;
                    width: (val: number) => number;
                    height: (val: number) => number;
                };
            };
        };
        tree: {
            window: {
                area: {
                    top: (val: number) => number;
                    left: (val: number) => number;
                    width: (val: number) => number;
                    height: (val: number) => number;
                };
            };
        };
        controls: {
            position: {
                top: (val: number) => number;
                left: (val: number) => number;
            };
        };
    };
};
export declare function applyGuard(data: any, guard: any): any;
export declare function guardMeta(data: any): any;
