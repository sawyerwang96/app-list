<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { Debounced } from '@/utils/helper.js'
import type { Ref } from 'vue'

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()
const props = withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {
    placeholder: 'Search...'
  }
)

const searchKey: Ref<string> = ref('')
const isEmpty = computed<boolean>(() => !searchKey.value.trim())

const handleCleanSearchKey = () => {
  searchKey.value = ''
  emit('search', '')
}
const keyChangeEvent = (key: string) => {
  searchKey.value = key
  emit('search', key)
}
const debounceUse: Function = new Debounced().use(keyChangeEvent, 200)
watchEffect(() => {
  let key = searchKey.value
  debounceUse(key)
})
</script>

<template>
  <div class="search">
    <span class="search__icon"></span>
    <input
      v-model="searchKey"
      type="text"
      class="text__input search__input"
      :placeholder="props.placeholder"
    />
    <span
      class="search__icon_x"
      v-show="!isEmpty"
      @click="handleCleanSearchKey"
    >
    </span>
  </div>
</template>

<style lang="scss" scoped src="@/assets/style/searchInput.scss"></style>
