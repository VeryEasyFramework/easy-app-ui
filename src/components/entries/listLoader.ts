import { easyApi } from "@/api/index.ts";
import type { Entry, EntryType, ListOptions } from "@vef/types/mod.ts";
import { Ref, ref } from "vue";
import { EasyApi } from "@vef/easy-api/mod.ts";

interface ListInfo {
  totalCount: Ref<number>
  itemsLoaded: Ref<number>
  itemsPerPage: number
  listHeight: Ref<number>
  limitStart: number
  resetScroll: Ref<boolean>
  currentPage: number
}

export class EntryListLoader {
  initialized: boolean
  entryType!: EntryType
  listInfo: ListInfo
  entryList: Ref<Entry[]>
  isListLoading: boolean = false
  listOptions: ListOptions
  easyApi: EasyApi

  constructor() {
    this.easyApi = easyApi
    this.initialized = false
    this.entryList = ref([])
    this.listOptions = {
      offset: 0,
      // limit: 20,
      // // filter: {},
      // orderBy: 'legacyCampaignId',
      // order: 'asc',
      // columns: [],
    }
    this.listInfo = {
      totalCount: ref(0),
      itemsLoaded: ref(0),
      itemsPerPage: 0,
      listHeight: ref(0),
      limitStart: 0,
      resetScroll: ref(false),
      currentPage: 1,
    }
  }

  async init(entryType: EntryType) {
    if (this.entryType?.entryType != entryType.entryType) {
      return
    }
    this.entryList.value = []
    this.listOptions.columns = entryType.listFields
    this.listOptions.orderBy = entryType.config.orderField || 'updatedAt'
    this.listOptions.order = entryType.config.orderDirection || 'desc'
    this.entryType = entryType
    if (!this.initialized) {
      // await this.loadList()
      this.initialized = true
    }
  }

  reset() {
    this.entryList.value = []
    this.listInfo.totalCount.value = 0
    this.listInfo.itemsLoaded.value = 0
    this.listInfo.currentPage = 1
    this.listInfo.limitStart = 0
  }

  async loadList() {
    if (!this.isListLoading) {
      this.isListLoading = true
      const {data, columns, rowCount, totalCount} =
        await this.easyApi.getList(this.entryType.entryType, {
          ...this.listOptions,
          offset: this.listInfo.limitStart,
          limit: this.listInfo.itemsPerPage
        })
      this.entryList.value.push(...data)

      this.listInfo.totalCount.value = totalCount
      this.listInfo.itemsLoaded.value = rowCount
      this.isListLoading = false
      this.listInfo.resetScroll.value = true
    }
  }

  async loadMore(lastItem: number) {
    if (this.listInfo.itemsLoaded.value >= this.listInfo.totalCount.value) {
      return
    }

    if (!this.isListLoading) {
      this.isListLoading = true

      const limitStart = this.entryList.value.length
      const limitPerPage = lastItem - limitStart + this.listInfo.itemsPerPage

      const {data, columns, rowCount, totalCount} =
        await this.easyApi.getList(this.entryType.entryType, {
          ...this.listOptions,
          offset: limitStart,
          limit: limitPerPage
        })
      this.entryList.value.push(...data)
      this.listInfo.totalCount.value = totalCount
      this.listInfo.itemsLoaded.value = this.entryList.value.length
      this.listInfo.currentPage = Math.floor(
        this.entryList.value.length / this.listInfo.itemsPerPage
      )
      this.isListLoading = false
    }
  }
}
