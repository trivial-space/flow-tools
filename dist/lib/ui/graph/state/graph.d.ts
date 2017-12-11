import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { GraphViewBox } from '../../types';
export declare const viewBox: EntityRef<GraphViewBox>;
export declare const simulationSteps: EntityRef<number>;
export interface Positions {
    [id: string]: {
        x: number;
        y: number;
    };
}
export declare const initialPosition: EntityRef<Positions>;
export declare const entityPositions: EntityRef<Positions>;
export declare const graphData: EntityRef<{
    entities: any[];
    processes: any[];
    edges: any[];
}>;
