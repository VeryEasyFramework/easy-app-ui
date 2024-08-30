import {createAppStore} from "@eveffer/easy-client";
import {api} from "@/api/index.ts";

export const useAppStore = createAppStore("appStore", api)
