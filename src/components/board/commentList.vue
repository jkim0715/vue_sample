<template>
  <div>
    아무거나 
    <div>
      {{comment}}
    </div>

    <input v-model="commentData.title" type="text">
    <button @click="registerComment" > 등록하기 </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'commentList',
    data(){
      return{
        commentData:{
                title: null,
            },
        user: this.$cookies.get('username')
      }
    },
    props:{
      comment:Object,
      id:Number
    },
    methods:{
      registerComment(){
        const config={
                headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                }
            }
        axios.post('http://127.0.0.1:8000/reviews/comment/create'+this.id+'/create',this.commentData, config)
        .then(res => {
            console.log(res.data)
            
        })
        .catch(err => console.log(err.response.data))

        },
    }

}
</script>

<style>

</style>