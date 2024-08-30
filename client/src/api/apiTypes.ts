import {EasyFieldType} from "../types/easyField";
import {BaseEntity} from "@/types/index.ts";

export interface DocsActionParam {
   paramName: string;
   required: boolean;
   type: EasyFieldType;
}


export interface GetListResult<T extends BaseEntity = BaseEntity> {
   rowCount: number;
   data: T[];
   columns: string[];
}

export interface DocsAction {
   actionName: string;
   description: string;
   params?: Array<DocsActionParam>;
   response?: string;
   public?: boolean;
}

export interface DocsActionGroup {
   groupName: string;
   actions: Array<DocsAction>;
}


export interface AdvancedFilter {
   op:
      | "contains"
      | "not contains"
      | "in list"
      | "not in list"
      | "between"
      | "not between"
      | "is"
      | "is not"
      | ">"
      | "<"
      | ">="
      | "<=";
   value: any;
}

export interface ListOptions {
   columns?: string[];
   filter?: Record<string, string | number | AdvancedFilter>;
   limit?: number;
   offset?: number;
   orderBy?: string;
   order?: "asc" | "desc";
}
