<template>
  <div class="jumbotron">
    <h1 class="display-4">크게 보십쇼</h1>
    <h2 class="display-4">{{article.title}}</h2>
    <p class="lead">작성자 : {{article.user.username}}</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    
    <commentList v-for='comment in comments' 
    :key='comment.id'
    :comment='comment'
     />
    <input v-model="commentData.title" type="text">
    <button @click="registerComment" > 등록하기 </button>
    <br>
    <button class="btn btn-primary btn-lg mx-1" >수정</button>
    <button class="btn btn-primary btn-lg" >좋아요</button>

</div>
  
  

</template>

<script>
import commentList from '../../components/board/commentList.vue'
import axios from 'axios'

export default {
    name:'articleDetail',
    props:['article'],
    data(){
      return{
        comments:null,
        commentData:{
          title:null
        }
      }
    },
    components:{
      commentList,
    },
    beforeUpdate(){
      
        axios.get('http://localhost:8000/reviews/comment/'+this.article.id+'/')
        .then(res=> {
            this.comments = res.data
        })
        .catch(err=> console.log(err.response))

     },
     created(){
        axios.get('http://localhost:8000/reviews/comment/'+this.article.id+'/')
        .then(res=> {
            this.comments = res.data
        })
        .catch(err=> console.log(err.response))
     },
    

    methods:{
      registerComment(){
        const config={
                headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                }
            }
        console.log(this.commentData,config)
        axios.post('http://127.0.0.1:8000/reviews/comment/create/'+this.article.id+'/',this.commentData, config)
        .then(res => {
            console.log(res.data)
            this.commentData.title = null
        })
        .catch(err => console.log(err.response.data))

        },
    }
}
</script>

<style>

</style>