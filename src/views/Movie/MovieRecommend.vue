<template>
  <div>
    <button @click="recommend1">진수의 추천</button>
    <div v-if="movies.length !==0 " class="row justify-content-center">
      <div class='card col-lg-2'  v-for='movie in movies' :key="movie.id">
        <movieListDetail :movie='movie' />
      </div>
    </div>
    <div v-else-if="this.$cookies.get('auth-token')=== null"><p>로그인해주세요</p></div>
  </div>
</template>

<script>
import axios from 'axios'
import movieListDetail from '../../components/movieListDetail.vue'
export default {
    name: 'MovieRecommend',
    data () {
      return {
        movies:[]
      }
    },
    components:{
      movieListDetail
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
          this.movies = res.data
        })
      }
    }
}
</script>

<style>

</style>