import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import Rate from '@/components/Rate.vue'

describe('Rate.vue', () => {
  let wrapper: VueWrapper
  let rateFilled: any

  beforeEach(() => {
    wrapper = shallowMount(Rate)
    rateFilled = wrapper.vm.$el.querySelector('.rate_filled')
  })

  it('props score', async () => {
    const score = 4.75279
    const defaultMax = 5
    await wrapper.setProps({ score })
    const expectValue = (score / defaultMax) * 100 + '%'
    expect(rateFilled.style.width).toBe(expectValue)
  })

  it('props default value of score ande max', async () => {
    const defaultScore = 0
    const defaultMax = 5
    expect(wrapper.props('score')).toBe(defaultScore)
    expect(wrapper.props('max')).toBe(defaultMax)
    expect(rateFilled.style.width).toBe('0%')
  })

  it('props score=6 max=10', async () => {
    await wrapper.setProps({ score: 6, max: 10 })
    expect(rateFilled.style.width).toBe('60%')
  })

  it('props score=70 max=100', async () => {
    await wrapper.setProps({ score: 70, max: 100 })
    expect(rateFilled.style.width).toBe('70%')
  })
})
