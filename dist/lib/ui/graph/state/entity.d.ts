import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { EntityData } from 'tvs-flow/dist/lib/runtime-types';
export declare const activeEntity: EntityRef<EntityData>;
export declare const activeProcess: EntityRef<{}>;
export declare const activeNode: EntityRef<{}>;
export declare const watchingEntity: EntityRef<boolean>;
export declare const activeValue: EntityRef<{}>;
export declare const editedValue: EntityRef<string>;
export declare const entityValueView: EntityRef<{
    value: any;
    watching: any;
}>;
export declare const entityViewProps: EntityRef<{
    entity: any;
    watching: any;
}>;
