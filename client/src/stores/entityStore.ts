import {EntityDefinition} from "@/types/index.ts";

export const entityStore = {
   entities: [] as EntityDefinition[],
   getDef(entityId: string): EntityDefinition | undefined {
      return this.entities.find((e) => e.entityId === entityId);
   }
}
