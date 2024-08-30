import {EasyField, EasyFieldType, EasyFieldTypeMap} from "./easyField";

export interface UserSession {
   session_id: string;
   user_id: string;
   hq_role?: "super_admin" | "admin" | "user";
   role?: string;
   account_id: string;
}

export interface BaseEntity {
   id: string;

   [key: string]: any;
}

export interface Currency {
   symbol: string;
   name: string;
   code: string;
   decimals: number;
}

interface FetchedField {
   key: string;
   label?: string;
   description?: string;
}


export interface Entity {
   id: EasyFieldTypeMap["IDField"];
   createdAt: EasyFieldTypeMap["DateField"];
   updatedAt: EasyFieldTypeMap["DateField"];

   [key: string]: EasyFieldTypeMap[EasyFieldType];
}

export interface EntityConfig {
   isPublic: boolean;
   isReadOnly: boolean;
   isSystem: boolean;
}

export interface BaseActions {
   save: boolean;
}


export interface EntityHooks {
   beforeCreate?: (entity: Entity) => void;
   afterCreate?: (entity: Entity) => void;
   beforeUpdate?: (entity: Entity) => void;
   afterUpdate?: (entity: Entity) => void;
   beforeDelete?: (entity: Entity) => void;
   afterDelete?: (entity: Entity) => void;
}

export interface EntityDefinition {
   entityId: string;
   label: string;
   fields: EasyField[];
   hooks: EntityHooks;
   config: EntityConfig;
   tableName: string;
   actions: BaseActions;
}



