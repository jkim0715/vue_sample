<template>
  <div>
      <!-- {{comments.results}} -->
      <p class="row" v-for="comment in comments" :key="comment.id">
          <span class="col-md-3">{{comment.user.username}} </span>
          <span class="col-md-3">{{comment.title}} </span>
          <span class="col-md-3">
                <span id=stars></span>
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
            output:[]
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
        },
        getStars(rating){
              // Round to nearest half
                rating = Math.round(rating * 2) / 2;
                let output = [];

                // Append all the filled whole stars
                for (var i = rating; i >= 1; i--)
                    output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

                // If there is a half a star, append it
                if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

                // Fill the empty stars
                for (let i = (5 - rating); i >= 1; i--)
                    output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
                console.log('starssssssssssssss')
                return output.join('');
                }       
    },
    created(){
        document.getElementById("stars").innerHTML= this.getStars(this.comment.rate);
    }
   
        
   
}
</script>

<style>
.checked {
  color: orange;
}
</style>