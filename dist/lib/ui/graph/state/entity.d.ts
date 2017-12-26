import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { ProcessedGraphEntity, ProcessedGraphProcess } from '../../../utils/entity-data-helpers';
export declare const activeEntityId: EntityRef<string>;
export declare const activeProcessId: EntityRef<string>;
export declare const activeEntity: EntityRef<ProcessedGraphEntity>;
export declare const activeProcess: EntityRef<ProcessedGraphProcess>;
export declare const activeNode: EntityRef<{
    id: string;
}>;
export declare const watchingEntity: EntityRef<boolean>;
export declare const activeValue: EntityRef<any>;
