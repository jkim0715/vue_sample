<template>
  <div>
    <div class="card">
      <div>
      <h5 class="card-header ">{{comment.user.username}}</h5>
      <p class='card-header'>{{comment.created_at}}</p>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{comment.title}}</h5>
        
        
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


<style >
h5{
  text-align: left;
  
}
p{
  text-align: right;
}
</style>