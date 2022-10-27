import type { AppInfoListType } from '@/types'

/**
 * 防抖
 * 使用方法 new Debounce().use(fn, delay, immediate)
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param immediate 首次是否立即执行
 */
export class Debounced {
  use = (
    fn: Function,
    delay: number = 200,
    immediate: boolean = false
  ): Function => {
    let timer: NodeJS.Timeout
    return (...args: any) => {
      if (immediate) {
        fn.apply(this, args)
        immediate = false
        return
      }
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

/**
 * 检查字符串数组元素是否包含关键字
 * @param list 需要校验的字符串数组
 * @param key 关键字
 * @returns Boolean
 */
export const isIncludeKey = (list: Array<string>, key: string): boolean => {
  return list.some((item) => {
    const context = item.toLowerCase()
    return context.includes(key)
  })
}

/**
 * 根据筛选app并分类，优先按app名称排序
 * @param list applist
 * @param key 关键字
 * @param filterIds 需要过滤的app id
 * @returns {
 *  ids (app名称 || 开发者 || 简介) 包含关键app id
 *  firstList app名称包含关键字的app列表,
 *  secondList 开发者或简介包含关键字的app列表
 * }
 */
export const filterAndClassify = (
  list: AppInfoListType,
  key: string,
  filterIds: string[] = []
) => {
  const listLen = list.length
  const firstList: AppInfoListType = []
  const secondList: AppInfoListType = []
  const ids: string[] = []
  for (let i = 0; i < listLen; i++) {
    const { id, name, artist, summary } = list[i]
    if (filterIds.includes(id)) {
      continue
    }
    if (isIncludeKey([name], key)) {
      firstList.push(list[i])
      ids.push(id)
      continue
    }
    if (isIncludeKey([artist, summary], key)) {
      secondList.push(list[i])
      ids.push(id)
    }
  }

  return {
    ids,
    firstList,
    secondList
  }
}
