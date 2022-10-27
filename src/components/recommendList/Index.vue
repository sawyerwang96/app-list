<script lang="ts">
export default {
  name: 'RecommendList'
}
</script>
<script setup lang="ts">
import RecommendItem from './RecommendItem.vue'

import { useAppStore } from '@/stores/useAppStore'
import { computed } from 'vue'
import type { AppInfoListType } from '@/types'

const appStore = useAppStore()
const recommendApp = computed<AppInfoListType>(() => appStore.recommendApps)
</script>

<template>
  <div class="recommend">
    <div class="recommend__title">为你推荐</div>
    <div class="recommend__list">
      <RecommendItem
        v-for="item in recommendApp"
        :detail="item"
        :key="'recommend_' + item.id"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/variable.scss';
@import '@/assets/style/mixins/mixin.scss';
.recommend {
  border-bottom: 1px solid $--border-color-base;
  padding-top: $--padding-base;
  padding-left: $--padding-large;

  &__title {
    font-size: $--font-size-medium;
    margin-bottom: 8px;
  }

  &__list {
    display: flex;
    overflow: auto;
  }
}

@include res(sm) {
  .recommend {
    padding-left: $--padding-base;

    &__title {
      font-size: $--font-size-large;
    }
  }
}
</style>
