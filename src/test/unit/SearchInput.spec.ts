import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import SearchInput from '@/components/SearchInput.vue'

describe('SearchInput.vue', () => {
  it('SearchInput.vue clean icon display', async () => {
    let wrapper = shallowMount(SearchInput)
    let cleanIconEl = wrapper.find('.search__icon_x')
    expect(cleanIconEl.isVisible()).toBeFalsy()

    let textInput = wrapper.find('.text__input')
    await textInput.setValue(' ')
    expect(cleanIconEl.isVisible()).toBeFalsy()

    await textInput.setValue('Youtube')
    expect(cleanIconEl.isVisible()).toBeTruthy()
  })
  

  it('SearchInput.vue clean icon click', async () => {
    let wrapper = shallowMount(SearchInput)
    let cleanIconEl = wrapper.find('.search__icon_x')
    let textInput = wrapper.find('.text__input')
    await textInput.setValue('Youtube')
    await cleanIconEl.trigger('click')
    expect(textInput.element.value).toBe('')
    expect(cleanIconEl.isVisible()).toBeFalsy()
  })
})
