import { Runtime } from 'tvs-flow/dist/lib/runtime-types';
export interface FlowTool {
    setFlow: (runtime: Runtime, label: string) => void;
    dispose: () => void;
    getState: () => Runtime;
    getElement: () => HTMLElement;
}
export declare function start(opts?: any): FlowTool;
