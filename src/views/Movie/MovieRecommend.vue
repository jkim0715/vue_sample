<template>
  <div>
    <button @click="recommend1">재영이의 5픽</button>
    <div v-if="movies.length !==0 " class="row justify-content-center">
      <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item" v-for='(movie,index) in movies' :key="movie.id" :class="{ active: index==0 } " data-interval="10000">
            <div class="card">
               <movieListDetail :movie='movie' />
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <div v-else-if="this.$cookies.get('auth-token')=== null">
      <p>로그인해주세요</p>
    </div>
  </div>
</template>

<script>


  import axios from 'axios'
  import movieListDetail from '../../components/movieListDetail.vue'
  export default {
    name: 'MovieRecommend',
    data() {
      return {
        movies: []
      }
    },
    components: {
      movieListDetail
    },
    methods: {
      recommend1() {
        const requestHeaders = {
          headers: {
            'Authorization': `Token ${this.$cookies.get('auth-token')}`
          }
        }
        axios.get(process.env.VUE_APP_SERVER_URL+'movies/recommend/', requestHeaders)
          .then(res => {
            this.movies = res.data
          })
      }
    }
  }
</script>

<style scoped>
.carousel .item {
  height: 300px;
}
.card-body {
  height: 600px;
  width: 300px
}
</style>