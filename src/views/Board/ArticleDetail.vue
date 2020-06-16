<template>
  <div class="jumbotron">
    <h1 class="display-4">크게 보십쇼</h1>
    <h2 class="display-4">{{article.title}}</h2>
    <p class="lead">작성자 : {{article.user.username}}</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <button class="btn btn-primary btn-lg" >수정</button>
    커멘트 
    <commentList v-for='comment in comments' 
    :key='comment.id'
    :comment='comment'
     />
    <test />
</div>
  
  

</template>

<script>
import commentList from '../../components/board/commentList.vue'
import test from '../../components/board/test.vue'
import axios from 'axios'

export default {
    name:'articleDetail',
    props:['article'],
    data(){
      return{
        comments:null
      }
    },
    components:{
      commentList,test
    },
    created(){
      
        axios.get('http://localhost:8000/reviews/comment/'+this.article.id+'/')
        .then(res=> {
            this.comments = res.data
        })
        .catch(err=> console.log(err.response))

     },
    

    methods:{
      

    }
}
</script>

<style>

</style>