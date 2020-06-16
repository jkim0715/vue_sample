<template>
  <div>
      <!-- {{comments.results}} -->
      <li v-for="comment in comments" :key="comment.id">
          {{comment.title}} 
          {{comment.rate}}점
        <button v-if="comment.user.username===user" @click="deleteComment(comment.id)">삭제</button>
      </li>
      <div>
      <!-- <button @click="down(); receive()">이전 페이지</button>
      <button @click="up();receive()">다음 페이지</button> -->
      </div>
    <input v-model="commentData.title" type="text">
    <input v-model='commentData.rate' type="number" min="0" max="10">
    <button @click="registerComment" > 등록하기 </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'movieComment',
    props:{
        comments:Array,
        movie_id:Number
    },
    data(){
        return{
            page:1,
            commentData:{
                title: null,
                rate : 0
            },
            user: this.$cookies.get('username')
        }
    },
    methods :{
        registerComment(){
        const config={
                headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                }
            }
        axios.post('http://127.0.0.1:8000/movies/moviecomment/'+this.movie_id+'/create',this.commentData,config)
        .then(( )=> {
            this.comments.push({
                id:null,
                movie:this.movie_id,
                rate: this.commentData.rate,
                title: this.commentData.title,
                user: {username:this.user}
            })
            this.commentData.title =null
            this.commentData.rate = 0
        })
        },

        deleteComment(commentId){
            this.$emit('delete-comment',commentId)
            // const config = {
            //     headers: {
            //     Authorization: `Token ${this.$cookies.get('auth-token')}`
            //         }
            // } 
            // axios.post(`http://localhost:8000/movies/deletemoviecomment/${commentId}/`, null, config)
        },

       
    }
   
        
   
}
</script>

<style>

</style>