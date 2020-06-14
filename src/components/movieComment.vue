<template>
  <div>
      <!-- {{comments.results}} -->
      <li v-for="comment in comments" :key="comment.id">
          {{comment.title}} 
          {{comment.rate}}점
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
            }
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
        .then(res => {
            this.comments.push({
                id:null,
                movie:this.comments[0].movie,
                rate: this.commentData.rate,
                title: this.commentData.title,
                user: res.data.user
            })
            this.commentData.title =null
            this.commentData.rate = 0
        })
        .catch(err => console.log(err.response.data))

        },
        
    }
   
        
   
}
</script>

<style>

</style>