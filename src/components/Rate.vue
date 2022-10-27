<script lang="ts">
export default {
  name: 'RateCmp'
}
</script>
<script lang="ts" setup>
import { StarFilled } from '@element-plus/icons-vue'
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    score?: number
    max?: 5 | 10 | 100
  }>(),
  {
    score: 0,
    max: 5
  }
)
const score = computed<string>(() => (props.score / props.max) * 100 + '%')
</script>

<template>
  <div class="rate">
    <div class="rate_defalut">
      <StarFilled
        v-for="i in 5"
        :key="'default_star_' + i"
        style="width: 18px; height: 18px; color: rgb(239, 242, 247)"
      />
    </div>
    <div class="rate_filled" :style="`width: ${score};`">
      <div class="rate_filled_inner">
        <StarFilled
          v-for="i in 5"
          :key="'light_star_' + i"
          style="width: 18px; height: 18px; color: rgb(247, 186, 42)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rate {
  position: relative;
  height: 22px;
  width: 90px;
  display: inline-block;

  &_defalut,
  &_filled {
    position: absolute;
    left: 0;
    top: 0;
  }

  &_filled {
    overflow: hidden;
  }

  &_filled_inner {
    width: 90px;
  }
}
</style>
