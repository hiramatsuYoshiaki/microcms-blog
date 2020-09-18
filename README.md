# microcms-blog

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## install

create-nuxt-app v3.2.0
✨ Generating Nuxt.js project in microcms-blog
? Project name: microcms-blog
? Programming language: TypeScript
? Package manager: Npm
? UI framework: Vuetify.js
? Nuxt.js modules: Axios
? Linting tools: ESLint, Prettier
? Testing framework: None
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Server (Node.js hosting)
? Development tools: jsconfig.json (Recommended for VS Code if you're not using typescript)

### nuxt.js(v2)で pug を利用する 　

https://qiita.com/amishiro/items/38fe1b102d7e91a93ada

```
$ npm i pug pug-loader pug-plain-loader
```

### Composition API の導入　

https://qiita.com/Aruneko/items/552fcd3ae5da4eb1b218

1. インストールする。

```
npm install @vue/composition-api
```

2. プラグインを設定する。
   `plugins/composition-api.ts`

```
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
```

3. nuxt.config を設定する　
   `nuxt.config.js`

```
plugins: ['@/plugins/composition-api'],
```

4. TypeScript Support use the APIs
   TypeScript が Vue コンポーネントオプション内のタイプを適切に推測できるようにするには、コンポーネントを次のように定義する必要があります

```
<script lang="ts">
import {  defineComponent } from '@vue/composition-api'
......
</script>
```

5. 使用したい API をインポートします

```
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  watchEffect,
} from '@vue/composition-api'
......
</script>
```

# Nuxt.js + Composition API で Vuex の State を Reactive に使う方法

https://qiita.com/tubone/items/f5c7e8e79e21b051eec4

### Vuex の store を Composition API で使う方法

ストアへのアクセス方法
Composition API では Vuex ストアは setup 内でしか取り出せません。

なぜなら Composition API は setup したタイミングで Vue インスタンスが利用できるため、いままでの Vue.js でいうところの this.\$store で取り出すことが setup 内でしか使えないからです。

なので、setup の中で root.\$store を取り出して(※1)、Vuex ストアを使う別の関数(※2)や template で利用するため setup の return に渡しています。(※3)

Action の呼び出し
上記 Components では、Vue.js ライフサイクルの onBeforeMount と、template 内の get-status ボタンの押下で fetchStatus という関数が呼び出され、同関数で Action が dispatch される作りです。(※4)(※5)

fetchStatus は setup 外に作られた関数なので、seutup の中で fetshStatus の引数に store を渡してあげます。

Getter の呼び出し
(※3)のようにあらかじめ Vuex ストア(store)を setup の return に設定することで(※6)のように store.getters['status/getStatus']という Vuex モジュールモードの getter の呼び出しの形で template 内で Getter が利用できます。

### Reactive な Vuex ストアを作る

omposition API の Reactive について
そもそも Reactive って何よ？って話はきたるべき vue-next のコアを理解する: そもそも「リアクティブ」とは?がすさまじくわかりやすいので解説はそちらに譲ります。

Composition API には Reactive な値を作り出すことのできる方法として有名どころで ref と reactive がありますが、Vuex ストアは State という自己定義のオブジェクトなのでプリミティブのみ許容の ref は使えません。reactive を使います。

(注 7)のように State オブジェクトを reactive で囲んであげれば Reactive な State になります。

Reactive な関係性を引き継ぐ toRefs
State を Reactive にすることはできました。

ですが、reactive にはスコープが存在しますので return で戻してしまうと戻り先で Reactive な関係が解消されてしまいます。

それを解決する方法として toRefs というものがあります。

(注 8)のように toRefs に reactive な値を引数に設定し、return することで戻り先でも reactive な変数として扱えます。

toRefs はどうやら Composition API のソースを見ると、受け取った reactive な値を Ref で再定義し、一個一個 getter, setter を設定している proxy らしいです

### Nuxt Axios との連携

https://qiita.com/Aruneko/items/552fcd3ae5da4eb1b218
これも問題なくできますが、少し準備が必要です。まず型付けを正しく行うために、nuxt.config.ts を編集します。なお、Auth Module を利用する際は事前にパッケージと型定義を導入しておいてください。あとは型定義をインポートして、declare module でどのプロパティにどの型を適用するか定義してあげましょう。
`nuxt.config.ts`

```
import { NuxtAxiosInstance } from '@nuxtjs/axios'
export default {
  // ここのひとかたまりを追加
  declare module 'vue/types/vue' {
    interface Vue {
      $axios: NuxtAxiosInstance
    }
  }
}
```

使う側では setup メソッドの第 2 引数に渡されてくる context 引数に実装が詰め込まれているので、そこから読むようにします。root プロパティの中に先ほど interface Vue で指定したプロパティが生えているので、呼んであげるだけです。補完もバッチリ効きますので、便利に使うことができます。
`index.vue`

```
export default{
  setup( context) {
    const posts = ref([])
    watch(async () => {
      // Axios Module を呼ぶ例
      users.value = await context.root.$axios.$get('/users')
    })
  }
  return { users, login }
}


```

###　 micrCMS の使い方　
https://microcms.io/blog/getting-started/

1. microCMS のアカウントを作成してログインして下さい。
2. サービス →API→ コンテンツと順に作成
3. API の作成　
   3-1 api 情報を入力
   3-2 api の型を選択
   3-3- api スキーマ-を定義
4. コンテンツ管理画面の画面右上の「追加」ボタンを押し入力して、その後「公開」ボタンを押します。
5. API 経由でデータを取得
   5-1 コンテンツ画面の右上にある「API プレビュー」をクリックする。
   5-2 画面内の「取得」ボタンを押し、JSON レスポンスがし、されることを確認する。

6. api-key を確認
   6-1 API リファレンスタブを押して、X-API-KEY を表示して確認する。

7. ブラウザでデータを表示

```
template lang="pug">
  div
    div
      h1 micro CMS Blog Test
    div
      h3 Blog Content
      ul
        li(v-for="content in contents" :key="content.id")
           h1 {{ content.title}}
           h5 {{ content.body}}
           h3 {{ content.link}}
           img(:src="content.image.url" width="300" height="200" alt="画像" )
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      contents: [],
    }
  },
  async asyncData() {
    const { data } = await axios.get(
      'https://h-works.microcms.io/api/v1/blog',
      {
        headers: { 'X-API-KEY': 'your-api-key' },
      }
    )
    return {
      contents: data.contents,
    }
  },
}
</script>
```

### Nuxt.js と microCMS で採用ページを作成してみよう！

https://microcms.io/blog/create-nuxt-microcms-recruit/

1. Nuxt.js プロジェクトのセットアップ

```
$ npx create-nuxt-app micro-cms-test
```

2. .env ファイルを作成する
   ルートディレクトリ直下、nuxt.config.js と同じ階層に.env ファイルを作成する。
   各 API は、microCMS の Web サイトのヘッダーメニュー「ＡＰＩリファレンス」>>「表示」より参照する。
   `.env`

```
 API_KEY='********-****-****-****-********fc14'
```

3. Git の管理下から除外する
   `.gitignore`

```
# dotenv environment variables file
.env
```

4. 環境変数を扱う dotenv をインストールする

```
  $ npm install --save @nuxtjs/dotenv

```

5. dotenv のセットアップ
   @nuxtjs/dotenv をモジュールに追加する。
   dotenv モジュールを使って
   .env ファイルを読み込むコード`require('dotenv').config()`を
   export default 前に記入する。
   `nuxt.config.js`

```
  require('dotenv').config() // 追記
  export default {
  modules: [
    '@nuxtjs/dotenv'　// 追記
  ],
}
```

5. .env ファイルの環境変数を Nuxt に登録する
   `nuxt.config.js`

```
  env: {
    API_KEY: process.env.API_KEY,
  },
```

### Nuxt.js】middleware を活用しブログ記事取得のパフォーマンスを改善する

参考：独学プログラム 　
https://blog.cloud-acct.com/posts/blog-nuxtjs-middleware

1. Vuex を使う  
   store/index.js を作り action 経由で非同期で、microCMS のＡＰＩを取得し、state へ保存します。
   `store/index.js`

```
import axios from 'axios'
// state
export const state = () => ({
  posts: [],
})
// mutation
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
}
// actions
export const actions = {
  async getPosts({ commit }) {
    await axios
      .get('https://h-works.microcms.io/api/v1/blog', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((res) => {
        commit('setPosts', res.data.contents)
      })
      .catch((err) => {
        console.log(`Error! HTTP Status: ` + err)
      })
  },
}
```

2.middleware からＡＰＩを取得します。
`middleware/getMicrocms.js`

```
export default async ({ store }) => {
  if (!store.state.posts.length) await store.dispatch('getPosts')
}
```

基本的に、middleware は全てのページを表示する前に実行されます。
そこで、記事が存在しないときだけリクエストを投げるように、if (!store.state.posts.length)という条件分岐をしています。

3. nuxt.config.js に middleware を登録する
   `nuxt.config.js`

```
export default {
  router: {
    middleware: [
      'getMicrocms'
    ]
  },
}
```

4. store でポストデーターを読み込む。
   `store/index.js`

```
import axios from 'axios'
// state
export const state = () => ({
  posts: [],
})
// mutation
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
}
// actions
export const actions = {
  async getPosts({ commit }) {
    await axios
      .get('https://h-works.microcms.io/api/v1/blog', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((res) => {
        commit('setPosts', res.data.contents)
        // console.log(res.data.contents)
      })
      .catch((err) => {
        console.log(`Error! HTTP Status: ` + err)
      })
  },
}
```

5. index.vue から呼び出してみる
   `pages/index.vue`

```
<template lang="pug">
  div
    div
      h1 micro CMS Blog Test
    div
      h3 Blog list
      ul
        li(v-for="post in posts" :key="post.id")
            nuxt-link( :to="`/posts/${post.id}`")
              h1 {{ post.title}}
            div
              h3 {{ post.body}}
              h3 {{ post.link}}
              h3 {{ post.users.name}}
              h3 {{ post.locations.locations}}
              h3 {{ post.stages.stage}}
              h3 {{ post.stages.title}}
              div(v-for="tag in post.tags" :key="tag.id")
                span.mr-4 {{tag.tags}}
              img(:src="post.image.url" width="300" height="200" alt="画像" )
      div.mt-8 {{posts}}
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      contents: [],
    }
  },
  computed: {
    ...mapState(['posts']),
  },
}
</script>
```

6. 単一記事の取得方法を Vuex の posts から取得するように変更します
   `pages/posts/_slug.vue`

```
<template lang="pug">
div
    h1 posts/_slug.vue
    h3 param: {{ $route.params.slug }}
    div.mt-4
        h3
            span {{ contents.stages.stage}}
            span  {{ contents.stages.title}}
        div
            span.mr-2 場所：
            span {{ contents.locations.locations}}
        div
            span.mr-2 Tags:
            span(v-for="tag in contents.tags" :key="tag.id")
                span.d-inline-block.mr-2 {{tag.tags}}
        h1 {{contents.title}}
        h3 {{ contents.body}}
        h3 {{ contents.link}}
        img(:src="contents.image.url" width="300" height="200" alt="画像" )
        h3 {{ contents.users.name}}
    div.mt-4
        h5 {{contents}}
    div.mt-4
        nuxt-link(to="/")
            h3 Home
</template>
<script>
// import axios from 'axios'
export default {
  async asyncData({ payload, store, params, error }) {
    const currentPost =
      payload ||
      (await store.state.posts.find((post) => post.id === params.slug))
    if (currentPost) {
      return { contents: currentPost }
    } else {
      return error({ statusCode: 400 })
    }
  },
  //   async asyncData({ error, route, params }) {
  //     try {
  //       const { data } = await axios.get(
  //         `https://h-works.microcms.io/api/v1/blog/${route.params.slug}`,
  //         {
  //           headers: { 'X-API-KEY': process.env.API_KEY },
  //         }
  //       )
  //       return {
  //         contents: data,
  //       }
  //     } catch (err) {
  //       error({
  //         statusCode: err.response.status,
  //         message: err.response.data.message,
  //       })
  //     }
  //   },
  data() {
    return {
      contents: [],
    }
  },
}
```

6. Nuxt.js × Contentful】カテゴリー記事一覧ページを作成する
   https://blog.cloud-acct.com/posts/blog-related-posts

ポストからカテゴリーをすべて取得する。
`pages/index.vue`

```
// mutation
export const mutations = {

  setLink(state, payload) {
    state.stages = []
    state.tags = []

    payload.map((post) => {
      const entory = post
      // stage store
      if (entory.stages) {
        const dataStages = state.stages.find((stg) => {
          return stg.id === entory.stages.id
        })
        if (!dataStages) {
          // state.stages.push(post.stages)
          state.stages.push(entory.stages)
        }
      }
      // locations
      if (entory.locations) {
        const dataLocations = state.locations.find((loc) => {
          return loc.id === entory.locations.id
        })
        if (!dataLocations) {
          state.locations.push(entory.locations)
        }
      }
      // tag store
      if (entory.tags) {
        entory.tags.map((tagsTag) => {
          const dataTags = state.tags.find((tag) => {
            return tag.id === tagsTag.id
          })
          if (!dataTags) {
            state.tags.push(tagsTag)
          }
        })
      }
    })
    state.stages.sort((a, b) => a.sort - b.sort)
    state.tags.sort((a, b) => a.sort - b.sort)
    state.locations.sort((a, b) => a.sort - b.sort)

  },
```

カテゴリーを表示する
`stages/index.vue `

```
<template lang="pug">
div
    div.mt-4
        h1 stage index.vue
    div.mt-4
        div(v-for="stage in stages" :key="stage.id")
            nuxt-link(:to="`/stages/${stage.id}`")
                h3
                    span.mr-2 {{stage.stageNo}}
                    span.mr-2 {{stage.title}}
                    span.mr-2 {{stage.id}}
            div(v-for="post in posts" :key="post.id")
                div.ml-4(v-if="stage.id === post.stages.id")
                    nuxt-link(:to="`/posts/${post.id}`")
                        h5
                            span.mr-2 {{post.title}}
                            span.mr-2 paost:{{post.id}}
                            span.mr-2 stage:{{post.stages.id}}
    div.mt-4
        h3 {{stages}}
    div.mt-4
        h3 {{posts}}
    div.mt-4
        nuxt-link(to="/")
            h3 Home
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['posts', 'stages']),
  },
}
</script>

```
