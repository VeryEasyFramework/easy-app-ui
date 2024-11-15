import type { EntryType } from "@vef/types/mod.ts";
import { easyApi } from "@/api/index.ts";

export const entryTypeStore = {
  entryTypes: new Map<string, EntryType>(),
  async init() {
    const entryTypes = await easyApi.call<Array<EntryType>>("app", "entryTypes");
    for (const entryType of entryTypes) {
      this.entryTypes.set(entryType.entryType, entryType);
    }
  },
  get(entryType: string): EntryType | undefined {
    return this.entryTypes.get(entryType);
  },
  list(): EntryType[] {
    return Array.from(this.entryTypes.values());
  }
}
