import { Action } from '../utils/inferno';
export declare const FLOW: {
    ENTITY_INSPECT: string;
    ENTITY_RESET: string;
    PROCESS_RUN: string;
    PROCESS_STOP: string;
    SET_RUNTIME: string;
    SELECT_ACTIVE_RUNTIME: string;
};
export declare const GUI: {
    ENTITY: {
        WATCH_ACTIVE_ENTITY: string;
        SAVE_VALUE: string;
        SAVE_META: string;
        SET_ACTIVE_PROCESS: string;
        SET_ACTIVE_ENTITY: string;
        RESET_ACTIVE_NODE: string;
        SET_VIEW_MODE: string;
    };
    GRAPH: {
        UPDATE_SCALE: string;
        UPDATE_SIZE: string;
        MOVE_VIEWPORT: string;
        MOVE_ENTITY_POSITION: string;
    };
    TREE: {
        TOGGLE_LEVEL: string;
    };
    MAIN: {
        SET_ACTIVE_WINDOW: string;
        UPDATE_VISIBILITY: string;
        CLOSE_WINDOW: string;
        MOVE_WINDOW: string;
        RESIZE_WINDOW: string;
    };
};
export declare function newAction(type: string, payload?: any): Action;
