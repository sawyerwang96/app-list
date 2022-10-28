import { describe, it, beforeAll, beforeEach, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/stores/useAppStore'

import RecommendList from '@/components/recommendList/Index.vue'
import RecommendItem from '@/components/recommendList/RecommendItem.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { mockRecommendApps } from '@/mock/testMockData'

describe('RecommendList.vue', () => {
  let appStore: any
  let wrapper: VueWrapper
  beforeAll(() => {
    setActivePinia(createPinia())
    appStore = useAppStore()
  })

  beforeEach(() => {
    wrapper = mount(RecommendList)
  })

  it('RecommendList.vue RecommendItem', async () => {
    appStore.updateRecommendApps(mockRecommendApps)
    await wrapper.vm.$nextTick()
    const recommendItemCmp = wrapper.findAllComponents(RecommendItem)
    expect(recommendItemCmp.length).toEqual(mockRecommendApps.length)
  })
})
