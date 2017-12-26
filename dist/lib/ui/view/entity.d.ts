import { ProcessedGraphProcess, ProcessedGraph, ProcessedGraphEntity } from '../../utils/entity-data-helpers';
export declare function entityValueView({entity, value, watching}: {
    entity: any;
    value: any;
    watching: any;
}, dispatch: any): any[];
export declare function entityDetailsView({entity, graph, meta}: {
    entity: ProcessedGraphEntity;
    graph: ProcessedGraph;
    meta: any;
}, dispatch: any): (string | {
    class: string;
} | (string | (string | any[])[] | (string | boolean | (string | (string | (string | (string | {
    onClick: () => any;
})[])[])[])[])[] | {
    class: string;
})[] | (string | any[] | {
    'style': string;
})[])[];
export declare function processValueView({process}: {
    process: any;
}, dispatch: any): any[];
export declare function processDetailsView({process, graph}: {
    process: ProcessedGraphProcess;
    graph: ProcessedGraph;
}, dispatch: any): any[];
