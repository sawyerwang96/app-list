<script lang="ts">
export default {
  name: 'SearchPage'
}
</script>
<script setup lang="ts">
import { onMounted } from 'vue'
import RecommendList from '@/components/recommendList/Index.vue'
import TopFreeList from '@/components/topFreeList/Index.vue'
import {
  queryRecommendApps,
  queryTopFreeApps,
  queryAppsByIds
} from '@/api/appRequest'
import { useAppStore } from '@/stores/useAppStore'
import { dataHandler, dataMerge } from '@/utils/helper'

const appStore = useAppStore()
const handleAppInfo = async (fn: Function) => {
  const originalData = await fn()
  let { ids, datalist } = dataHandler(originalData)
  let { results } = await queryAppsByIds(ids)
  dataMerge(datalist, results)
  return datalist
}

onMounted(async () => {
  // 获取推荐app
  const recommendApps = await handleAppInfo(queryRecommendApps)
  appStore.updateRecommendApps(recommendApps)

  // 获取下载量最高的app
  const topFreeApps = await handleAppInfo(queryTopFreeApps)
  appStore.updateTopFreeApps(topFreeApps)
})
</script>

<template>
  <RecommendList />
  <TopFreeList />
</template>
