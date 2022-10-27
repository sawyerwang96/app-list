<script setup lang="ts">
import type { AppInfoType } from '@/types'
import { vLazyLoad } from '@/directives/lazyload';
import { computed } from 'vue'
import Rate from '../Rate.vue'

const props = withDefaults(
  defineProps<{
    data: AppInfoType
    index?: number
    rank?: boolean
  }>(),
  {
    index: 1,
    rank: false
  }
)
const appData = computed<AppInfoType>(() => props.data)
const isRoundImg = computed<boolean>(() => props.index % 2 === 0)
</script>

<template>
  <div class="topfree__item">
    <div class="topfree__item_rank" v-if="props.rank">
      {{ props.index }}
    </div>
    <img
      v-lazy-load="appData.image"
      class="topfree__item_img"
      :class="isRoundImg && 'round'"
      alt=""
    />
    <div class="topfree__item_detail">
      <div class="topfree__item_name">
        {{ appData.name }}
      </div>
      <div class="topfree__item_type">
        {{ appData.category }}
      </div>
      <div class="topfree__item_rateAndComments">
        <Rate :score="appData.rate" />
        <span class="topfree__item_comments">
          {{ `(${appData.comments})` }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/variable.scss';
@import '@/assets/style/mixins/mixin.scss';

.topfree__item {
  display: flex;
  align-items: center;
  padding-top: $--padding-medium;
  padding-bottom: $--padding-medium;
  border-bottom: 1px solid $--border-color-light;
  flex-shrink: 0;
  flex-grow: 0;

  &_rank {
    margin-right: 20px;
    font-size: $--font-size-extra-small;
    color: $--color-text-secondary;
  }

  &_img {
    border: 1px solid $--border-color-lighter;
    border-radius: 20px;
    margin-right: 20px;
    width: 70px;
    &.round {
      border-radius: 50%;
    }
  }

  &_detail {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &_name {
    font-size: $--font-size-base;
  }

  &_rateAndComments {
    display: flex;
    align-items: center;
  }

  &_type,
  &_comments {
    color: $--color-text-secondary;
    font-size: $--font-size-extra-small;
  }
}

@include res(sm) {
  .topfree__item {
    &_rank {
      font-size: $--font-size-base;
    }

    &_img {
      width: 80px;
    }

    &_detail {
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &_type {
      font-size: $--font-size-base;
    }

    &_name {
      font-size: $--font-size-medium;
    }

    &_rateAndComments {
      font-size: $--font-size-base;
    }
  }
}
</style>
