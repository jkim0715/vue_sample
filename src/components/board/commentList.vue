<template>
  <div>
    <div class="card">
      <h5 class="card-header">{{comment.user.username}}</h5>
      <div class="card-body">
        <h5 class="card-title">{{comment.title}}</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>  
    


<!-- 
    <div>
      <span>{{comment.user.username}}</span>
      <br>
      <hr>
      {{comment.title}}
      <hr>
    </div> -->

    
  </div>
</template>

<script>
// import axios from 'axios'
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
    

}
</script>

<style>

</style>