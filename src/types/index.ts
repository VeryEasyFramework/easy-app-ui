import {EasyField, EasyFieldType, EasyFieldTypeMap} from "./easyField";

export interface FieldGroupDefinition {
   key: string;
   title: string;
   description?: string;
}

export interface FieldGroup {
   key: string;
   title: string;
   description?: string;
   fields: Array<EasyField>;
}

export interface EasyEntityConfig {
   label: string;
   description: string;
   titleField?: string;
   tableName: string;
   orderField?: string;
   orderDirection?: "asc" | "desc";
}

export type EntityHook =
   | "beforeSave"
   | "afterSave"
   | "beforeInsert"
   | "afterInsert"
   | "validate";

export interface EntityHookDefinition {
   label?: string;
   description?: string;

   action(): Promise<void> | void;
}

export type EasyEntityHooks = Record<EntityHook, Array<EntityHookDefinition>>;

export interface EntityActionParam {
   key: string;
   fieldType: EasyFieldType;
   required?: boolean;
}

export interface EntityActionDefinition {
   label?: string;
   description?: string;
   private?: boolean;
   global?: boolean;

   action(params?: Record<string, any>): Promise<void> | void;

   params?: Array<EntityActionParam>;
}

export interface EntityAction extends EntityActionDefinition {
   key: string;
}

export interface EntityDefinition {
   entityId: string;
   fields: Array<EasyField>;
   fieldGroups: Array<FieldGroup>;
   listFields: Array<string>;
   config: EasyEntityConfig;
   hooks: EasyEntityHooks;
   actions: Array<EntityAction>;
}


export interface EntityRecord {
   id: string;
   createdAt: EasyFieldTypeMap["TimestampField"];
   updatedAt: EasyFieldTypeMap["TimestampField"];

   [key: string]: any;
}
