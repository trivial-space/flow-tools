export interface Area {
    top: number;
    left: number;
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
export interface UIEntityProperties {
    activeEntityId: string;
    activeProcessId: string;
    watchingEntity: boolean;
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
export interface UIMeta {
    name?: string;
    ui?: {
        entity?: PartialUIMetaEntity;
        graph?: PartialUIMetaGraph;
        tree?: PartialUIMetaTree;
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