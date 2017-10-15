import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { Entity, Process } from 'tvs-flow/dist/lib/runtime-types';
export declare const activeEntityId: EntityRef<string>;
export declare const activeProcessId: EntityRef<string>;
export declare const activeEntity: EntityRef<Entity>;
export declare const activeProcess: EntityRef<Process>;
export declare const activeNode: EntityRef<{
    id: string;
}>;
export declare const watchingEntity: EntityRef<boolean>;
export declare const activeValue: EntityRef<any>;
export declare const entityViewProps: EntityRef<{
    entity: any;
    value: any;
    watching: any;
}>;
