import { Runtime } from "tvs-flow/dist/lib/runtime-types";
export interface FlowTool {
    updateFlow: (Runtime) => void;
    dispose: () => void;
    getState: () => Runtime;
    getElement: () => HTMLElement;
}
export declare function start(title?: string): FlowTool;
