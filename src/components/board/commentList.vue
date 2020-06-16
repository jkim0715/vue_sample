<template>
  <div>
    <div>
      {{comment}}
    </div>

    
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