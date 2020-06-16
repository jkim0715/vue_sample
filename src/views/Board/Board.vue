<template>
  <div>
    <h1>리뷰 게시판</h1>
    <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">제목</th>
      <th scope="col">작성자</th>
      <th scope="col">작성일</th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col">비고</th>
    </tr>
  </thead>
  <tbody>
    <articleList
      v-for="(article, index) in articles" :key="article.id"
      :article="article"
      :index="index"
      @delete-index-data='deleteArticle'
      @select-index-data='selectArticle'
      @select-indexcomponent='selectArticleComponent'
    /> 
  </tbody>
  
</table>
  <router-link :to="{name:'articlecreate'}">글 쓰기</router-link>

  <ArticleDetail  :article='tmp'/>
  </div>


</template>

<script>
import axios from 'axios'
import articleList from '@/components/board/articleList'
import ArticleDetail from './ArticleDetail.vue'

export default {
    name: 'Board',
    components:{
      articleList,ArticleDetail
    },
    data(){
        return {
            articles:[],
            tmp:null
        }
    },
    created(){
      axios.get('http://localhost:8000/reviews/')
        .then(res => {
          this.articles = res.data
        })
    },
    methods:{
      deleteArticle(indexdata){
        const config={
                headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                }
                }
           axios.post('http://localhost:8000/reviews/delete/'+indexdata[0]+'/', null, config )
           .then(res=> {
               console.log(res)
               this.$router.push({name:'board'})
           })
           this.articles.splice(indexdata[1],1)
      },
      selectArticle(indexdata){
        this.$router.push(
          {name:'articledetail',
          params :{article:indexdata[0]}
          }
        )
      },
      selectArticleComponent(indexdata){
        console.log(typeof(indexdata),'ddd')
        this.tmp = indexdata[0]
      }
      
    }
}
</script>

<style>

</style>