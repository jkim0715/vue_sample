<template>
  <div class="card-body">
    <img :src="backdrop_URL" class="card-img-top" alt="대체 텍스트">
    <h5 class="card-title">{{movie.title}}</h5>
    <p>평점: {{movie.vote_average}}</p>
    <td> <movieDetailfordb :movie="movie" type="button" class= 'btn-btn-primary' /></td>
  </div>
</template>

<script>
import movieDetailfordb from './movieDetailfordb.vue'
export default {
    name:'movieListDetail',
    components:{
      movieDetailfordb
    },
    props:{
      movie:Object
    },
    computed:{
      backdrop_URL(){
        const IMGURL='https://image.tmdb.org/t/p/original'
        return IMGURL+this.movie.poster_path
      },
    }

  }
</script>

<style>

</style>