import type { AppInfoListType } from '@/types'
import { defineStore } from 'pinia'
import { filterAndClassify } from '@/utils/helper'

export const useAppStore = defineStore('appStore', {
  state: () =>
    <
      {
        recommendApps: AppInfoListType
        topFreeApps: AppInfoListType
        searchResultApps: AppInfoListType
      }
    >{
      recommendApps: [],
      topFreeApps: [],
      searchResultApps: []
    },
  actions: {
    updateRecommendApps(data: AppInfoListType) {
      this.recommendApps = data
    },
    updateTopFreeApps(data: AppInfoListType) {
      this.topFreeApps = data
    },
    updateSearchResultApps(key: string) {
      const {
        ids,
        firstList: recSearchNameAppList,
        secondList: recSearchOtherAppList
      } = filterAndClassify(this.recommendApps, key)

      const {
        firstList: freeSearchNameAppList,
        secondList: freeSearchOtherAppList
      } = filterAndClassify(this.topFreeApps, key, ids)

      this.searchResultApps = [
        ...recSearchNameAppList,
        ...freeSearchNameAppList,
        ...recSearchOtherAppList,
        ...freeSearchOtherAppList
      ]
    }
  }
})
