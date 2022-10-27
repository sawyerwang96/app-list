<script lang="ts">
export default {
  name: 'SearchPage'
}
</script>
<script setup lang="ts">
import { onMounted } from 'vue'
import RecommendList from '@/components/recommendList/Index.vue'
import TopFreeList from '@/components/topFreeLists/Index.vue'
import {
  queryRecommendApps,
  queryTopFreeApps,
  queryAppsByIds
} from '@/api/appRequest'
import { useAppStore } from '@/stores/useAppStore'
import type {
  AppInfoType,
  AppInfoListType,
  originalAppInfoBase,
  originalAppInfoOther
} from '@/types/index'

const appStore = useAppStore()

/**
 * 从原始数据中提出后续使用的数据
 * @param data 原始数据数组
 */
const dataHandler: (data: Array<originalAppInfoBase>) => {
  ids: Array<string>
  datalist: AppInfoListType
} = (data) => {
  let ids: Array<string> = []
  let datalist: AppInfoListType = data.map(
    (item: originalAppInfoBase): AppInfoType => {
      ids.push(item.id.attributes['im:id'])
      return {
        id: item.id.attributes['im:id'],
        category: item.category.attributes.label,
        name: item['im:name'].label,
        image: item['im:image'][2].label,
        summary: item.summary.label,
        artist: item['im:artist'].label,
        rate: 0,
        comments: 0
      }
    }
  )
  return { ids, datalist }
}

/**
 * 获取应用评分、以及评论数
 * @param target 需要设置评分、评论数的数据对象
 * @param origin 包含评分、评论数的原始数据
 */
const dataMerge = (
  target: AppInfoListType,
  origin: Array<originalAppInfoOther>
) => {
  origin.forEach((item, index: number) => {
    target[index].rate = item.averageUserRating
    target[index].comments = item.userRatingCount || 0
  })
}

onMounted(async () => {
  // 获取推荐app
  const recommendAppsOrigin = await queryRecommendApps()
  const {
    ids: recommendAppsId,
    datalist: recommendApps
  } = dataHandler(recommendAppsOrigin)
  let { results: recommendAppsDeatils } = await queryAppsByIds(recommendAppsId)
  dataMerge(recommendApps, recommendAppsDeatils)
  appStore.updateRecommendApps(recommendApps)

  // 获取下载量最高的app
  const topFreeAppsOrigin = await queryTopFreeApps()
  const {
    ids: topFreeAppsId,
    datalist: topFreeApps
  } = dataHandler(topFreeAppsOrigin)
  const { results: topFreeAppsDeatils } = await queryAppsByIds(topFreeAppsId)
  dataMerge(topFreeApps, topFreeAppsDeatils)
  appStore.updateTopFreeApps(topFreeApps)
})
</script>

<template>
  <RecommendList />
  <TopFreeList />
</template>
