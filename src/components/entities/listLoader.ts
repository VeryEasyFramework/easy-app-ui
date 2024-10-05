import {easyApi} from "@/api/index.ts";
import type {EasyApi, EntityDefinition, EntityRecord, ListOptions} from "@vef/easy-api";
import {Ref, ref} from "vue";

interface ListInfo {
   totalCount: Ref<number>
   itemsLoaded: Ref<number>
   itemsPerPage: number
   listHeight: Ref<number>
   limitStart: number
   resetScroll: Ref<boolean>
   currentPage: number
}

export class EntityListLoader {
   initialized: boolean
   entity!: EntityDefinition
   listInfo: ListInfo
   entityList: Ref<EntityRecord[]>
   isListLoading: boolean = false
   listOptions: ListOptions
   easyApi: EasyApi

   constructor() {
      this.easyApi = easyApi
      this.initialized = false
      this.entityList = ref([])
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

   async init(entity: EntityDefinition) {
      if (this.entity?.entityId != entity.entityId) {
         return
      }
      this.entityList.value = []
      this.listOptions.columns = entity.listFields
      this.listOptions.orderBy = entity.config.orderField || 'updatedAt'
      this.listOptions.order = entity.config.orderDirection || 'desc'
      this.entity = entity
      if (!this.initialized) {
         // await this.loadList()
         this.initialized = true
      }
   }

   reset() {
      this.entityList.value = []
      this.listInfo.totalCount.value = 0
      this.listInfo.itemsLoaded.value = 0
      this.listInfo.currentPage = 1
      this.listInfo.limitStart = 0
   }

   async loadList() {
      if (!this.isListLoading) {
         this.isListLoading = true
         const {data, columns, rowCount, totalCount} =
            await this.easyApi.getList(this.entity.entityId, {
               ...this.listOptions,
               offset: this.listInfo.limitStart,
               limit: this.listInfo.itemsPerPage
            })
         this.entityList.value.push(...data)

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

         const limitStart = this.entityList.value.length
         const limitPerPage = lastItem - limitStart + this.listInfo.itemsPerPage

         const {data, columns, rowCount, totalCount} =
            await this.easyApi.getList(this.entity.entityId, {
               ...this.listOptions,
               offset: limitStart,
               limit: limitPerPage
            })
         this.entityList.value.push(...data)
         this.listInfo.totalCount.value = totalCount
         this.listInfo.itemsLoaded.value = this.entityList.value.length
         this.listInfo.currentPage = Math.floor(
            this.entityList.value.length / this.listInfo.itemsPerPage
         )
         this.isListLoading = false
      }
   }
}
