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
      <th scope="col">비고</th>
    </tr>
  </thead>
  <tbody>
    <articleList
      v-for="(article, index) in articles" :key="article.id"
      :article="article"
      :index="index"
    /> 
  </tbody>
</table>
  <router-link :to="{name:'articlecreate'}">글 쓰기</router-link>
  </div>


</template>

<script>
import axios from 'axios'
import articleList from '@/components/board/articleList'
export default {
    name: 'Board',
    components:{
      articleList
    },
    data(){
        return {
            articles:[],
        }
    },
    created(){
      axios.get('http://localhost:8000/reviews/')
        .then(res => {
          this.articles = res.data
        })
    },

}
</script>

<style>

</style>