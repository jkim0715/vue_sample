<template>
  <div class="jumbotron">
    <h1 class="display-4">크게 보십쇼</h1>
    <h2 class="display-4">{{article.title}}</h2>
    <p class="lead">작성자 : {{article.user.username}}</p>
    <hr class="my-4">
    <p>{{article.content}}</p>
    <h3>댓글 목록</h3>
    <commentList v-for='comment in comments' 
    :key='comment.id'
    :comment='comment'
    @deletecomment='deleteComment'
     />
    <input v-model="commentData.title" type="text">
    <button @click="registerComment" > 등록하기 </button>
    <br>
    <button class="btn btn-primary btn-lg mx-1" @click="selectArticle(article.id)" >수정</button>
    <button @click="like(article.id)" type="button">좋아요</button>

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
            
            // console.log(this.comments)
            this.commentData.title = null
            
            this.comments.push({
              created_at:res.data.created_at,
              id:res.data.id,
              title:res.data.title,
              user:{
                id:res.data.user.id,
                username:res.data.user.username
              }

            })
        })
        .catch(err => console.log(err))

        },
        like(articleid){
          this.$emit('Article-like',articleid)
            

        },
        selectArticle(indexnum){
        this.$router.push(
          {name:'articleupdate',
          params :{articleNum:indexnum}
          }
        )
      },
      deleteComment(commentId){
            const config = {
                headers: {
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                    }
            } 
            axios.post('http://localhost:8000/reviews/comment/delete/'+commentId+'/',null, config)
            .then(res=>{
                console.log(res.data)
                axios.get('http://localhost:8000/reviews/comment/'+this.article.id+'/')
                .then(res=> {
                  this.comments = res.data
                  })
                .catch(err=> console.log(err.response))
            })
        },
    }
}
</script>

<style>

</style>