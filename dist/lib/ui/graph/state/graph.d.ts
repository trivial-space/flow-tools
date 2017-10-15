import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { GraphViewBox } from '../../types';
export declare const viewBox: EntityRef<GraphViewBox>;
export declare const entityPositions: EntityRef<{
    [id: string]: {
        x: number;
        y: number;
    };
}>;
export declare const graphData: EntityRef<{
    entities: any[];
    processes: any[];
    edges: any[];
}>;
