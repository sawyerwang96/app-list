<script setup lang="ts">
import { computed, ref } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import SearchPage from '@/views/SearchPage.vue'
import SearchResult from '@/views/SearchResult.vue'

import { useAppStore } from '@/stores/useAppStore'
import { filterAndClassify } from './utils/helper'

const appStore = useAppStore()
let view = computed(() => (searchKey.value ? SearchResult : SearchPage))
let searchKey = ref('')

/**
 * 搜索处理事件
 * @param key 搜索关键字
 */
const handleSearch = (key: string) => {
  key = key.toLowerCase().trim()
  searchKey.value = key

  if (key === '') {
    return
  }

  let {
    ids,
    firstList: recSearchNameAppList,
    secondList: recSearchOtherAppList
  } = filterAndClassify(appStore.recommendApps, key)

  let { firstList: freeSearchNameAppList, secondList: freeSearchOtherAppList } =
    filterAndClassify(appStore.topFreeApps, key, ids)

  appStore.updateSearchResultApps([
    ...recSearchNameAppList,
    ...freeSearchNameAppList,
    ...recSearchOtherAppList,
    ...freeSearchOtherAppList
  ])
}
</script>

<template>
  <div class="header">
    <SearchInput @search="handleSearch" />
  </div>

  <div class="main">
    <KeepAlive>
      <component :is="view" />
    </KeepAlive>
  </div>
</template>
