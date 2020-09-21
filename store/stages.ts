import axios from 'axios'
import { reactive, Ref, toRefs } from '@vue/composition-api'
//interface
export interface Stage {
  contents: [
    {
      id: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      stageNo: string
      title: string
      sort: number
    }
  ]
}
//declare
declare type Refs<Data> = {
  [K in keyof Data]: Data[K] extends Ref<infer V> ? Ref<V> : Ref<Data[K]>
}
//state
export const state = (): Refs<Stage> => {
  return toRefs(
    reactive<Stage>({
      contents: [
        {
          id: '',
          createdAt: '',
          updatedAt: '',
          publishedAt: '',
          stageNo: '',
          title: '',
          sort: 0,
        },
      ],
    })
  )
}
//mutations
export const mutations = {
  setContentsStages(state: Stage, contents: Stage) {
    state.contents = contents
  },
}
//actions
export const actions = {
  async fetchMicrocmsStages(context: any): Promise<void> {
    await axios
      .get('https://h-works.microcms.io/api/v1/stage', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((res) => {
        console.log('stage/action get Stage---------3')
        console.log(res.data.contents)
        context.commit('setContentsStages', res.data.contents)
      })
      .catch((err) => {
        // commit(setStatus, 'error');
        // commit(setVersion, 'error');
        console.log('error: ' + err)
      })
  },
}
//getters
export const getters = {
  getStages(state: Stage) {
    return state
  },
}
