<script lang="ts">
export default {
  name: 'RecommendItem'
}
</script>
<script setup lang="ts">
import type { AppInfoType } from '@/types'
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    data: AppInfoType
  }>(),
  {}
)
const appData = computed<AppInfoType>(() => props.data)
</script>

<template>
  <div class="recommend__item">
    <img :src="appData.image" alt="" class="recommend__item_img" />
    <div
      class="recommend__item_name ellipsis text_center"
      :title="appData.name"
    >
      {{ appData.name }}
    </div>
    <div class="recommend__item_type ellipsis text_center">
      {{ appData.category }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/variable.scss';
@import '@/assets/style/mixins/mixin.scss';

.recommend__item {
  width: 80px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:not(:last-child) {
    margin-right: 20px;
  }

  &_img {
    border-radius: 20px;
    border: 1px solid $--border-color-lighter;
  }

  &_name {
    width: 100%;
    font-size: $--font-size-base;
    color: $--color-text-regular;
  }

  &_type {
    font-size: $--font-size-extra-small;
    color: $--color-text-secondary;
  }
}

@include res(sm) {
  .recommend__item {
    width: 100px;

    &_name {
      font-size: $--font-size-medium;
    }

    &_type {
      font-size: $--font-size-base;
      color: $--color-text-secondary;
    }
  }
}
</style>
