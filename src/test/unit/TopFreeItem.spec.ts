import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import TopFreeItem from '@/components/topFreeList/TopFreeItem.vue'
import { mockBaseAppData } from '@/mock/testMockData'
import { vi } from 'vitest'

describe('TopFreeItem.vue', () => {
  const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn()
  }))
  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = shallowMount(TopFreeItem, { props: { data: mockBaseAppData } })
  })

  it('TopFreeItem.vue render context', () => {
    const nameWrapper = wrapper.vm.$el.querySelector('.topfree__item_name')
    const typeWrapper = wrapper.vm.$el.querySelector('.topfree__item_type')
    const commentWrapper = wrapper.vm.$el.querySelector(
      '.topfree__item_comments'
    )
    expect(nameWrapper.textContent).toBe(mockBaseAppData.name)
    expect(typeWrapper.textContent).toBe(mockBaseAppData.category)
    expect(commentWrapper.textContent).toBe(`(${mockBaseAppData.comments})`)
  })

  it('TopFreeItem.vue props rank', async () => {
    expect(wrapper.find('.topfree__item_rank').exists()).toBeFalsy()
    await wrapper.setProps({ rank: true })
    expect(wrapper.find('.topfree__item_rank').exists()).toBeTruthy()
  })

  it('TopFreeItem.vue props index', async () => {
    await wrapper.setProps({ rank: true })
    const rankEl = wrapper.vm.$el.querySelector('.topfree__item_rank')
    expect(rankEl.textContent).toBe('1')
    await wrapper.setProps({ rank: true, index: 5 })
    expect(rankEl.textContent).toBe('5')
  })

  it('TopFreeItem.vue img border radius', async () => {
    const imgEl = wrapper.find('.topfree__item_img')
    expect(imgEl.element.className).not.toContain('round')
    await wrapper.setProps({ index: 6 })
    expect(imgEl.element.className).toContain('round')
  })
})
