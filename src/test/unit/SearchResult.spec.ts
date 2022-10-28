import { describe, it, beforeAll, beforeEach, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/stores/useAppStore'
import SearchResult from '@/views/SearchResult.vue'
import TopFreeItem from '@/components/topFreeList/TopFreeItem.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { mockBaseAppData, mockRecommendApps, mockTopFreeApps } from '@/mock/testMockData'

describe('SearchResult.vue', () => {
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
    wrapper = mount(SearchResult)
  })

  it('SearchResult.vue TopFreeItem', async () => {
    appStore.updateRecommendApps([mockBaseAppData, ...mockRecommendApps])
    appStore.updateTopFreeApps([...mockTopFreeApps, mockBaseAppData])
    appStore.updateSearchResultApps(mockBaseAppData.name)
    await wrapper.vm.$nextTick()
    const recommendItemCmp = wrapper.findAllComponents(TopFreeItem)
    expect(recommendItemCmp.length).toEqual(appStore.searchResultApps.length)
  })
})
