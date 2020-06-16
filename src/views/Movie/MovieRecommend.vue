<template>
  <div>
    <button @click="recommend1">알고1</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'MovieRecommend',
    data () {
      return {

      }
    },
    methods:{
      recommend1() {
        const requestHeaders = {
        headers: {
          'Authorization': `Token ${this.$cookies.get('auth-token')}`
        }
      }
        axios.get('http://localhost:8000/movies/recommend/', requestHeaders)
        .then(res=>{
          console.log(res)
        })
      }
    }
}
</script>

<style>

</style>