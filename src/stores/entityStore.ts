import type {EntityDefinition} from "@vef/types";

export const entityStore = {
   entities: [] as EntityDefinition[],
   getDef(entityId: string): EntityDefinition | undefined {
      return this.entities.find((e) => e.entityId === entityId);
   }
}
