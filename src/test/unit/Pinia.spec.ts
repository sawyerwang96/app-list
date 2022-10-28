import { expect, describe, it, beforeAll } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/stores/useAppStore'
import {
  mockBaseAppData,
  mockRecommendApps,
  mockTopFreeApps
} from '@/mock/testMockData'
describe('Pinia', () => {
  let appStore: any
  beforeAll(() => {
    setActivePinia(createPinia())
    appStore = useAppStore()
  })

  it('Pinia init state', () => {
    expect(appStore.recommendApps.length).toEqual(0)
    expect(appStore.topFreeApps.length).toEqual(0)
    expect(appStore.searchResultApps.length).toEqual(0)
  })

  it('Pinia action updateRecommendApps', async () => {
    appStore.updateRecommendApps(mockRecommendApps)
    expect(appStore.recommendApps).toEqual(mockRecommendApps)
    expect(appStore.recommendApps.length).toEqual(mockRecommendApps.length)
    appStore.updateRecommendApps([])
    expect(appStore.recommendApps.length).toEqual(0)
  })

  it('Pinia action updateTopFreeApps', () => {
    appStore.updateTopFreeApps(mockTopFreeApps)
    expect(appStore.topFreeApps).toEqual(mockTopFreeApps)
    expect(appStore.topFreeApps.length).toEqual(mockTopFreeApps.length)
  })

  it('Pinia action updateSearchResultApps', () => {
    appStore.updateRecommendApps([mockBaseAppData, ...mockRecommendApps])
    appStore.updateTopFreeApps([...mockTopFreeApps, mockBaseAppData])
    appStore.updateSearchResultApps(mockBaseAppData.name)
    const len = mockRecommendApps.length + mockTopFreeApps.length - 1
    expect(appStore.searchResultApps.length).toEqual(len)
  })
})
