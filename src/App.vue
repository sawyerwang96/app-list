<script setup lang="ts">
import { computed, ref } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import SearchPage from '@/views/SearchPage.vue'
import SearchResult from '@/views/SearchResult.vue'

import { useAppStore } from '@/stores/useAppStore'

const appStore = useAppStore()
let view = computed(() => (searchKey.value ? SearchResult : SearchPage))
let searchKey = ref('')
const mainbox = ref()

// 搜索事件
const handleSearch = (key: string) => {
  key = key.toLowerCase().trim()
  searchKey.value = key
  if (key === '') {
    return
  }
  mainbox.value.style.overflow = 'hidden'
  mainbox.value.scrollTop = 0
  appStore.updateSearchResultApps(key)
  mainbox.value.style.overflow = 'auto'
}
</script>

<template>
  <div class="header">
    <SearchInput @search="handleSearch" />
  </div>

  <div class="main" ref="mainbox" id="mainbox">
    <KeepAlive>
      <component :is="view" />
    </KeepAlive>
  </div>
</template>
