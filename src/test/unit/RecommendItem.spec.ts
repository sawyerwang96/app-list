import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import RecommendItem from '@/components/recommendList/RecommendItem.vue'

import { mockBaseAppData as data } from '@/mock/testMockData'

describe('RecommendItem.vue', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = shallowMount(RecommendItem, { props: { data } })
  })

  it('RecommendItem.vue render context', () => {
    const nameWrapper = wrapper.vm.$el.querySelector('.recommend__item_name')
    const typeWrapper = wrapper.vm.$el.querySelector('.recommend__item_type')
    expect(nameWrapper.textContent).toBe(data.name)
    expect(typeWrapper.textContent).toBe(data.category)
  })
})
