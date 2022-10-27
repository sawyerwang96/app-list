import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TopFreeItem from '@/components/topFreeLists/TopFreeItem.vue'
import type { AppInfoType } from '@/types'
import { vi } from 'vitest'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

const data: AppInfoType = {
  id: '1626979616',
  category: '相片與影片',
  name: '三國志幻想大陸-卡牌王者',
  image: 'https://is5-ssl.mzstatic.com/image/thumb/Purple112/v4/50/78/a1/5078a1a0-8687-ece7-2d71-0c0252050af2/logo_youtube_color-1x_U007emarketing-0-6-0-85-220.png/100x100bb.png', 
  summary: `"===遊戲特色===`,
  artist: 'Qookka Entertainment Limited', 
  rate: 4.5, 
  comments: 100
}

describe('TopFreeItem.vue', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mount(TopFreeItem, {props: { data }})
  })

  it('TopFreeItem.vue render context', () => {
    const nameWrapper = wrapper.vm.$el.querySelector('.topfree__item_name')
    const typeWrapper = wrapper.vm.$el.querySelector('.topfree__item_type')
    const commentWrapper = wrapper.vm.$el.querySelector('.topfree__item_comments')
    expect(nameWrapper.textContent).toBe(data.name)
    expect(typeWrapper.textContent).toBe(data.category)
    expect(commentWrapper.textContent).toBe(`(${data.comments})`)
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
