import { SettingsEntityDefinition } from "@vef/types/mod.ts";
import { easyApi } from "@/api/index.ts";

export const settingsStore: SettingsStore = {
  settings: [],
  initialized: false,
  async init() {
    if (this.initialized) return;
    this.settings = await easyApi.call("app", "settings");
  },
  getSettingsDef(settingId: string): any {
    return this.settings.find((s) => s.settingsId === settingId);
  }

}

interface SettingsStore {

  settings: Array<SettingsEntityDefinition>;
  initialized: boolean;

  init(): Promise<void>;

  getSettingsDef(settingId: string): SettingsEntityDefinition | undefined;
}
