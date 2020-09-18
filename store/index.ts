import axios from 'axios'
// import { Context } from '@nuxt/types'
import {
  defineComponent,
  SetupContext,
  reactive,
  Ref,
  toRefs,
} from '@vue/composition-api'

export interface Locations {
  contents: [
    {
      id: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      locations: string
    }
  ]
}
// export interface Location {
//       contents: Location
//       id: string
//       createdAt: string
//       updatedAt: string
//       publishedAt: string
//       locations: string
// }
declare type Refs<Data> = {
  //謎のtype
  [K in keyof Data]: Data[K] extends Ref<infer V> ? Ref<V> : Ref<Data[K]>
}
export const state = (): Refs<Locations> => {
  return toRefs(
    reactive<Locations>({
      contents: [
        {
          id: '',
          createdAt: '',
          updatedAt: '',
          publishedAt: '',
          locations: '',
        },
      ],
    })
  )
}
export const mutations = {
  setContentsLocations(state: Locations, contents: Locations) {
    console.log('setContentsLocations--------')
    state.contents = contents
  },
  //   setContentsPosts(state: Location, contents: Location) {
  //     console.log('setContentsPosts--------pppppppppppp')
  //     // state.contents = contents
  //   },
}
export const actions = {
  async fetchMicrocmsLocations(context: any): Promise<void> {
    await axios
      .get('https://h-works.microcms.io/api/v1/locations', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((res) => {
        console.log('action get locations---------3')
        console.log(res.data.contents)
        context.commit('setContentsLocations', res.data.contents)
      })
      .catch((err) => {
        // commit(setStatus, 'error');
        // commit(setVersion, 'error');
        console.log('error: ' + err)
      })
  },
  //   async fetchMicrocmsPosts(context: any): Promise<void> {
  //     await axios
  //       .get('https://h-works.microcms.io/api/v1/blog', {
  //         headers: { 'X-API-KEY': process.env.API_KEY },
  //       })
  //       .then((res) => {
  //         console.log('action get Posts---------3')
  //         console.log(res.data.contents)
  //         //   context.commit('setContentsPosts', res.data.contents)
  //       })
  //       .catch((err) => {
  //         // commit(setStatus, 'error');
  //         // commit(setVersion, 'error');
  //         console.log('error: ' + err)
  //       })
  //   },
  async fetchTest() {
    console.log('fetchTest middleware ****************')
  },
}
export const getters = {
  getLocation(state: Location) {
    console.log('getLocation--------4')
    return state
  },
}
// export interface Posts {
//     id: string
//     createdAt: string
//     updatedAt: string
//     publishedAt: string
//     title: string
//     link: string
//     image: {
//       url: string
//     }
//     stage: {
//       id: string
//       createdAt: string
//       updatedAt: string
//       publishedAt: string
//       stageNo: string
//       title: string
//       sort: number
//     }
//     users: {
//       id: string
//       createdAt: string
//       updatedAt: string
//       publishedAt: string
//       name: string
//       message: string
//       photo: {
//         url: string
//       }
//     }
//     locations: {
//       id: string
//       createdAt: string
//       updatedAt: string
//       publishedAt: string
//       locations: string
//     }
//     tags: [
//       {
//         id: string
//         createdAt: string
//         updatedAt: string
//         publishedAt: string
//         tags: string
//       }
//     ]
//     body: string
//   }
//   export interface Locations {
//     id: string
//     createdAt: string
//     updatedAt: string
//     publishedAt: string
//     locations: string
//   }
// {
//     id: 'z79ab_7lq',
//     createdAt: '2020-09-07T06:15:58.679Z',
//     updatedAt: '2020-09-08T04:49:48.349Z',
//     publishedAt: '2020-09-07T06:15:58.679Z',
//     title: 'なんばパークス＠なんばパークス',
//     link: 'https://tourdehdr3.netlify.app/post/2020_stage2_1',
//     image: {
//       url:
//         'https://images.microcms-assets.io/protected/ap-northeast-1:56472755-2372-48da-825b-a78b47617ea1/service/h-works/media/ima6945_8x10.jpg',
//     },
//     stages: {
//       id: 'ltj1zzpol',
//       createdAt: '2020-09-02T04:52:23.646Z',
//       updatedAt: '2020-09-07T06:38:43.272Z',
//       publishedAt: '2020-09-02T04:52:23.646Z',
//       stageNo: 'STAGE2 2020',
//       title: 'なんばパークス',
//       sort: 20200002,
//     },
//     users: {
//       id: 'vxidfi22f',
//       createdAt: '2020-09-02T04:36:59.092Z',
//       updatedAt: '2020-09-02T04:40:08.745Z',
//       publishedAt: '2020-09-02T04:36:59.092Z',
//       name: 'TOURdeHDR',
//       message: '<p>HDRフォトグラファーです。</p>',
//       photo: {
//         url:
//           'https://images.microcms-assets.io/protected/ap-northeast-1:56472755-2372-48da-825b-a78b47617ea1/service/h-works/media/img8503.jpg',
//       },
//     },
//     locations: {
//       id: 'mgtz4kjev',
//       createdAt: '2020-09-02T06:15:59.177Z',
//       updatedAt: '2020-09-02T06:15:59.177Z',
//       publishedAt: '2020-09-02T06:15:59.177Z',
//       locations: '広島',
//     },
//     tags: [
//       {
//         id: 'ima1hfo0d',
//         createdAt: '2020-09-02T06:03:35.742Z',
//         updatedAt: '2020-09-02T06:03:35.742Z',
//         publishedAt: '2020-09-02T06:03:35.742Z',
//         tags: 'structure',
//       },
//       {
//         id: 'mccf-8yzb',
//         createdAt: '2020-09-02T05:57:32.980Z',
//         updatedAt: '2020-09-02T05:57:32.980Z',
//         ublishedAt: '2020-09-02T05:57:32.980Z',
//         tags: 'Landscape',
//       },
//     ],
//     body: '大坂の難波にあるなんばパークスでHDRしました。',
//   }
