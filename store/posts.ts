import axios from 'axios'
import { reactive, Ref, toRefs } from '@vue/composition-api'
//interface
export interface Posts {
  contents: [
    {
      id: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      title: string
      link: string
      image: {
        url: string
      }
      stage: {
        id: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        stageNo: string
        title: string
        sort: number
      }
      users: {
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
      locations: {
        id: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        locations: string
      }
      tags: [
        {
          id: string
          createdAt: string
          updatedAt: string
          publishedAt: string
          tags: string
        }
      ]
      body: string
    }
  ]
}
//declare
declare type Refs<Data> = {
  [K in keyof Data]: Data[K] extends Ref<infer V> ? Ref<V> : Ref<Data[K]>
}
//state
export const state = (): Refs<Posts> => {
  return toRefs(
    reactive<Posts>({
      contents: [
        {
          id: '',
          createdAt: '',
          updatedAt: '',
          publishedAt: '',
          title: '',
          link: '',
          image: {
            url: '',
          },
          stage: {
            id: '',
            createdAt: '',
            updatedAt: '',
            publishedAt: '',
            stageNo: '',
            title: '',
            sort: 0,
          },
          users: {
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
          locations: {
            id: '',
            createdAt: '',
            updatedAt: '',
            publishedAt: '',
            locations: '',
          },
          tags: [
            {
              id: '',
              createdAt: '',
              updatedAt: '',
              publishedAt: '',
              tags: '',
            },
          ],
          body: '',
        },
      ],
    })
  )
}
//mutations
export const mutations = {
  setContentsPosts(state: Posts, contents: Posts) {
    state.contents = contents
  },
}
//actions
export const actions = {
  async fetchMicrocmsPosts(context: any): Promise<void> {
    await axios
      .get('https://h-works.microcms.io/api/v1/blog', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((res) => {
        console.log('posts/action get Posts---------3')
        console.log(res.data.contents)
        context.commit('setContentsPosts', res.data.contents)
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
  getPosts(state: Posts) {
    return state
  },
}
