import InfernoComponent from 'inferno-component';
import { Runtime } from 'tvs-flow/dist/lib/runtime-types';
import { VNode } from 'inferno';
import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
export interface Action {
    type: string;
    payload: any;
}
export interface Dispatcher {
    (action: Action | string, payload?: any): void;
}
export interface Template {
    (state: any, dispatch?: Dispatcher, component?: Component): VNode | any[];
}
export declare abstract class ComponentClass extends InfernoComponent<null, any> {
}
export interface Component {
    (template: Template, entity: EntityRef<any>): ComponentClass;
}
export declare function flowComponentFactory(stateFlow: Runtime, dispatchId: string, debug?: boolean): Component;
export declare function h(el: any): VNode;
