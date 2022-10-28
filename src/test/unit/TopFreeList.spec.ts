import { describe, it, beforeAll, beforeEach, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/stores/useAppStore'

import TopFreeLists from '@/components/topFreeList/Index.vue'
import TopFreeItem from '@/components/topFreeList/TopFreeItem.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { mockTopFreeApps } from '@/mock/testMockData'

describe('RecommendList.vue', () => {
  const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn()
  }))
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

  let wrapper: VueWrapper
  let appStore: any
  beforeAll(() => {
    setActivePinia(createPinia())
    appStore = useAppStore()
  })

  beforeEach(() => {
    wrapper = mount(TopFreeLists)
  })

  it('RecommendList.vue RecommendItem', async () => {
    appStore.updateTopFreeApps(mockTopFreeApps)
    await wrapper.vm.$nextTick()
    const recommendItemCmp = wrapper.findAllComponents(TopFreeItem)
    expect(recommendItemCmp.length).toEqual(mockTopFreeApps.length)
  })
})
