<template>
  <div>
      <!-- {{comments.results}} -->
      <p class="row" v-for="comment in comments" :key="comment.id">
          <span class="col-md-3">{{comment.user.username}} </span>
          <span class="col-md-3">{{comment.title}} </span>
          <span class="col-md-3">
              {{comment.rate}}점</span>
        <button class="col-md-2 btn btn-danger" v-if="comment.user.username===user" @click="deleteComment(comment.id)">삭제</button>
      </p>
      <div>
      <!-- <button @click="down(); receive()">이전 페이지</button>
      <button @click="up();receive()">다음 페이지</button> -->
      </div>
    <input v-model="commentData.title" type="text">
    <input v-model='commentData.rate' type="number" min="0" max="10">
    <button class="btn btn-primary" @click="registerComment" > 등록하기 </button>
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
            user: this.$cookies.get('username'),
            output:[],

        }
    },
    methods :{
        registerComment(){
        const config={
                headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                }
            }
        axios.post(process.env.VUE_APP_SERVER_URL+'movies/moviecomment/'+this.movie_id+'/create',this.commentData,config)
        .then((res )=> {
            this.$emit('createcomment',res.data.movie)
            console.log(res)
            this.comments.push({
                id:res.data.id,
                movie:this.movie_id,
                rate: res.data.rate,
                title: res.data.title,
                user: {username:this.user}
            })
            this.commentData.title =null
            this.commentData.rate = 0
        })
        },
     computed : {

    },
        deleteComment(commentId){
            this.$emit('delete-comment',commentId)
        },
    },
   
        
   
}
</script>

<style>

</style>