import axios from 'axios'
import { reactive, Ref, toRefs } from '@vue/composition-api'
//interface
export interface User {
  contents: [
    {
      id: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      name: string
      message: string
      photo: {
        url: string
      }
    }
  ]
}
//declare
declare type Refs<Data> = {
  [K in keyof Data]: Data[K] extends Ref<infer V> ? Ref<V> : Ref<Data[K]>
}
//state
export const state = (): Refs<User> => {
  return toRefs(
    reactive<User>({
      contents: [
        {
          id: '',
          createdAt: '',
          updatedAt: '',
          publishedAt: '',
          name: '',
          message: '',
          photo: {
            url: '',
          },
        },
      ],
    })
  )
}
//mutations
export const mutations = {
  setContentsUsers(state: User, contents: User) {
    state.contents = contents
  },
}
//actions
export const actions = {
  async fetchMicrocmsUsers(context: any): Promise<void> {
    await axios
      .get('https://h-works.microcms.io/api/v1/users', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((res) => {
        console.log('User/action get User---------3')
        console.log(res.data.contents)
        context.commit('setContentsUsers', res.data.contents)
      })
      .catch((err) => {
        // commit(setStatus, 'error');
        // commit(setVersion, 'error');
        console.log('error: ' + err)
      })
  },
}
//getUsers
export const getters = {
  getUsers(state: User) {
    return state
  },
}
