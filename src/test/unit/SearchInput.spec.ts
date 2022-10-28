import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SearchInput from '@/components/SearchInput.vue'

describe('SearchInput.vue', () => {
  it('SearchInput.vue clean icon display', async () => {
    const wrapper = shallowMount(SearchInput)
    const cleanIconEl = wrapper.find('.search__icon_x')
    expect(cleanIconEl.isVisible()).toBeFalsy()

    const textInput = wrapper.find('.text__input')
    await textInput.setValue(' ')
    expect(cleanIconEl.isVisible()).toBeFalsy()

    await textInput.setValue('Youtube')
    expect(cleanIconEl.isVisible()).toBeTruthy()
  })

  it('SearchInput.vue clean icon click', async () => {
    const wrapper = shallowMount(SearchInput)
    const cleanIconEl = wrapper.find('.search__icon_x')
    const textInput = wrapper.find('.text__input')
    await textInput.setValue('Youtube')
    await cleanIconEl.trigger('click')
    expect(textInput.element.value).toBe('')
    expect(cleanIconEl.isVisible()).toBeFalsy()
  })

  it('SearchInput.vue emit search event', async () => {
    const wrapper = shallowMount(SearchInput)
    wrapper.vm.$emit('search', 'Youtube')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().search).toBeTruthy()
    expect(wrapper.emitted().search.length).toEqual(1)
  })
})
