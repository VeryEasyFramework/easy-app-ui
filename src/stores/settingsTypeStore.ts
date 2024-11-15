import type { SettingsType } from "@vef/types/mod.ts";
import { easyApi } from "@/api/index.ts";

export const settingsTypeStore: SettingsStore = {
  settings: new Map(),
  initialized: false,
  async init() {
    if (this.initialized) return;
    const settings = await easyApi.call<Array<SettingsType>>("app", "settingsTypes");

    for (const setting of settings) {
      this.settings.set(setting.settingsType, setting);
    }
  },
  get(settingId: string): any {
    return this.settings.get(settingId);
  },
  list() {
    return Array.from(this.settings.values());
  }

}

interface SettingsStore {

  settings: Map<string, SettingsType>;
  initialized: boolean;

  init(): Promise<void>;

  get(settingId: string): SettingsType | undefined;

  list(): SettingsType[];
}
