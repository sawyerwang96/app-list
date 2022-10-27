<script lang="ts">
export default {
  name: 'TopFreeList'
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import type { AppInfoListType } from '@/types'
import TopFreeItem from './TopFreeItem.vue'
import { useAppStore } from '@/stores/useAppStore'

const appStore = useAppStore()
const freeApp = computed<AppInfoListType>(() => appStore.topFreeApps)
</script>

<template>
  <div class="topfree__list">
    <TopFreeItem
      v-for="(item, index) in freeApp"
      :key="'topfree_' + item.id"
      :data="item"
      :index="index + 1"
      :rank="true"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/mixins/mixin.scss';
.topfree__list {
  padding-left: $--padding-large;
}

@include res(sm) {
  .topfree__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-left: $--padding-base;
    padding-right: $--padding-base;
  }
  .topfree__item {
    width: 46%;
  }
}
</style>
