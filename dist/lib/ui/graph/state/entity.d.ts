import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { Process } from 'tvs-flow/dist/lib/runtime-types';
import { ProcessedGraphEntity } from '../../../utils/entity-tree';
export declare const activeEntityId: EntityRef<string>;
export declare const activeProcessId: EntityRef<string>;
export declare const activeEntity: EntityRef<ProcessedGraphEntity>;
export declare const activeProcess: EntityRef<Process>;
export declare const activeNode: EntityRef<{
    id: string;
}>;
export declare const watchingEntity: EntityRef<boolean>;
export declare const activeValue: EntityRef<any>;
export declare const entityViewProps: EntityRef<{
    entity: ProcessedGraphEntity;
    value: any;
    watching: boolean;
}>;
