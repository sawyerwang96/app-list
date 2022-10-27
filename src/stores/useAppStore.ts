import type { AppInfoListType } from '@/types'
import { defineStore } from 'pinia'

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
    updateSearchResultApps(data: AppInfoListType) {
      this.searchResultApps = data
    }
  }
})
