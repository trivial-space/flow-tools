import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { Action } from '../../utils/inferno';
import { WindowSizeState } from 'tvs-libs/dist/lib/events/dom';
import { MouseState } from 'tvs-libs/dist/lib/events/mouse';
export declare const windowSize: EntityRef<WindowSizeState>;
export declare const element: EntityRef<HTMLElement>;
export declare const mouse: EntityRef<MouseState>;
export declare const mouseDrag: EntityRef<{
    x: number;
    y: number;
}>;
export declare const dragDeltas: EntityRef<{
    x: number;
    y: number;
}>;
export declare const action: EntityRef<Action>;
