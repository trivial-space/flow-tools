import { EntityRef } from "tvs-flow/dist/lib/utils/entity-reference";
import { Entity } from "tvs-flow/dist/lib/runtime-types";
export declare const activeEntity: EntityRef<Entity>;
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
