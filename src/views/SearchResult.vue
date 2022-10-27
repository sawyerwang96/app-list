<script setup lang="ts">
import TopFreeItem from '@/components/topFreeLists/TopFreeItem.vue'
import { useAppStore } from '@/stores/useAppStore'
import { computed } from 'vue'
import type { AppInfoListType } from '@/types/index'

const appStore = useAppStore()
const applist = computed<AppInfoListType>(() => appStore.searchResultApps)
</script>

<template>
  <div class="search__result">
    <template v-if="applist.length">
      <TopFreeItem
        v-for="item in applist"
        :key="`search_${item.id}`"
        :data="item"
        :rank="false"
      />
    </template>
    <div v-else class="search__result_empty">无结果</div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/variable.scss';
@import '@/assets/style/mixins/mixin.scss';
.search__result {
  &_empty {
    text-align: center;
    font-size: $--font-size-large;
    color: $--color-text-regular;
    margin-top: 50px;
  }
}

@include res(xs) {
  .topfree__item {
    padding-left: $--padding-large;
  }
}
</style>
