import {EasyFieldType} from "../types/easyField";
import {EntityRecord} from "@/types/index.ts";

export interface DocsActionParam {
   paramName: string;
   required: boolean;
   type: EasyFieldType;
}


export interface GetListResult<T extends EntityRecord = EntityRecord> {
   rowCount: number;
   totalCount: number;
   data: T[];
   columns: string[];
}

export interface DocsAction {
   actionName: string;
   description: string;
   params?: Array<DocsActionParam>;
   response?: string;
   public?: boolean;
   system?: boolean;
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
      | "<="
      | "="
      | "starts with"
      | "ends with";

   value: any;
}

export interface ListOptions {
   columns?: string[];
   filter?: Record<string, string | number | AdvancedFilter>;
   orFilter?: Record<string, string | number | AdvancedFilter>;
   limit?: number;
   offset?: number;
   orderBy?: string;
   order?: "asc" | "desc";
}
