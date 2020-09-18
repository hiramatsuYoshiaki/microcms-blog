<template lang="pug">
div 
  div.mt-4   
    h1 {{title.titleText}} 
    h2 {{subtitle.subtitleText}}
    div.mt-4
      h1 Locations
      div(v-for="loca in store.getters.getLocation.contents" :key="loca.id")
        h3 {{ loca.locations}}
    div.mt-4
      h1 Posts
      div(v-for="post in store.getters['posts/getPosts'].contents" :key="post.id")
        h3 {{ post.title}}
    div.mt-4
      h1 store stete contents
      p {{ store.getters.getLocation}}
    div.mt-4
      h1 posts contents data
      p {{ store.getters['posts/getPosts'].contents}}

    
</template>
<script lang="ts">
import {
  defineComponent,
  SetupContext,
  onBeforeMount,
  ref,
  reactive,
  watchEffect,
} from '@vue/composition-api'

import axios from 'axios'
export default defineComponent({
  setup({ root }: SetupContext, context: SetupContext) {
    console.log('setup start----------1')
    const title = reactive({ titleText: 'Micro CMS Blog TOURdeHDR+3' })
    const subtitle = reactive({
      subtitleText: 'composition-api with Typescript',
    })
    const posts = ref([])
    const locations = ref([])
    //store
    const store = context.root.$store
    //action
    const fetchMicrocms = async (store) => {
      console.log('setup fetchMicrocmsLocations--------2')
      // store.dispatchでActionを呼び出す
      // setupからstoreを受け取る (※4)
      await store.dispatch('fetchMicrocmsLocations')
      // await store.dispatch('fetchMicrocmsPosts')
      await store.dispatch('posts/fetchMicrocmsPosts')
      // this.$store.getters['namespaceName/doneTodos'];
    }
    //methods
    onBeforeMount(async () => {
      // 当然setup外で設定した関数にもアクセス可能(※4)
      // 関数内でstoreを使うため引数で渡しておく(※2)
      // console.log('onBeforeMount fetchMicrocmsLocations')
      await fetchMicrocms(store)
    })

    //watch
    // watchEffect(async () => {
    //   const postsData = await axios
    //     .get('https://h-works.microcms.io/api/v1/blog', {
    //       headers: { 'X-API-KEY': process.env.API_KEY },
    //     })
    //     .then((res) => {
    //       posts.value = res.data.contents
    //     })
    //     .catch((err) => {
    //       console.log('error: ' + err)
    //     })
    // })
    return {
      title,
      subtitle,
      posts,
      locations,
      fetchMicrocms,
      store,
    }
  },
})
</script>
