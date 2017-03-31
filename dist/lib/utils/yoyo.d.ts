import { Runtime } from "tvs-flow/dist/lib/runtime-types";
export interface Action {
    type: string;
    payload: any;
}
export interface Dispatcher {
    (action: Action | string, payload?: any): void;
}
export interface Template {
    (state: any, dispatch?: Dispatcher, component?: Component, root?: HTMLElement): HTMLElement;
}
export interface Component {
    (template: Template, viewStateId: string): HTMLElement;
}
export declare function flowComponentFactory(stateFlow: Runtime, dispatchId: string, debug?: boolean): Component;
export declare function h(elData: any): any;
