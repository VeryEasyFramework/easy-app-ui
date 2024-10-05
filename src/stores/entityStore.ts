import type {EntityDefinition} from "@vef/easy-api";

export const entityStore = {
   entities: [] as EntityDefinition[],
   getDef(entityId: string): EntityDefinition | undefined {
      return this.entities.find((e) => e.entityId === entityId);
   }
}
