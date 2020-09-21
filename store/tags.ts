import axios from 'axios'
import { reactive, Ref, toRefs } from '@vue/composition-api'
//interface
export interface Tag {
  contents: [
    {
      id: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      tags: string
    }
  ]
}
//declare
declare type Refs<Data> = {
  [K in keyof Data]: Data[K] extends Ref<infer V> ? Ref<V> : Ref<Data[K]>
}
//state
export const state = (): Refs<Tag> => {
  return toRefs(
    reactive<Tag>({
      contents: [
        {
          id: '',
          createdAt: '',
          updatedAt: '',
          publishedAt: '',
          tags: '',
        },
      ],
    })
  )
}
//mutations
export const mutations = {
  setContentsTags(state: Tag, contents: Tag) {
    state.contents = contents
  },
}
//actions
export const actions = {
  async fetchMicrocmsTags(context: any): Promise<void> {
    await axios
      .get('https://h-works.microcms.io/api/v1/tags', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((res) => {
        console.log('Tag/action get Tag---------3')
        console.log(res.data.contents)
        context.commit('setContentsTags', res.data.contents)
      })
      .catch((err) => {
        // commit(setStatus, 'error');
        // commit(setVersion, 'error');
        console.log('error: ' + err)
      })
  },
}
//getTags
export const getters = {
  getTags(state: Tag) {
    return state
  },
}
