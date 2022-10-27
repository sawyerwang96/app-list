import axios from 'axios'
import type {
  NumberOrStringType,
  originalAppInfoBase,
  originalAppInfoOther
} from '@/types/index'

const instance = axios.create({
  baseURL: '/hk'
})

instance.interceptors.response.use(function (response) {
  const {
    data,
    config: { headers }
  } = response
  if ((headers as any).queryAppsByIds) {
    return data
  } else {
    const {
      feed: { entry = [] }
    } = data
    return entry
  }
})

/**
 * 查询推荐APP
 * @param limit 查询数量
 * @returns
 */
export const queryRecommendApps = async (limit: NumberOrStringType = 10) => {
  const url = `/rss/topgrossingapplications/limit=${limit}/json`
  const result: Array<originalAppInfoBase> = await instance.get(url)
  return result
}

/**
 * 查询下载量最多的免费APP
 * @param limit 查询数量
 * @returns
 */
export const queryTopFreeApps = async (limit: NumberOrStringType = 100) => {
  const url = `/rss/topfreeapplications/limit=${limit}/json`
  const result: Array<originalAppInfoBase> = await instance.get(url)
  return result
}

/**
 * 根据APP id查询APP详情
 * @param ids 需要查询的id数组
 * @returns
 */
export const queryAppsByIds = async (ids: Array<string>) => {
  const queryIds = ids.join(',')
  const url = `/lookup?id=${queryIds}`
  const result: { results: Array<originalAppInfoOther>; resultCount: number } =
    await instance.get(url, {
      headers: { queryAppsByIds: true }
    })
  return result
}
