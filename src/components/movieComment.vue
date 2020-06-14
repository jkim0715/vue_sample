<template>
  <div>
      <li v-for="comment in comments" :key="comment.id">
          {{comment.title}} 
          {{comment.rate}}점
      </li>
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
            console.log(res.data)
        })
        .catch(err => console.log(err.response.data))

        }
    }
   
        
   
}
</script>

<style>

</style>