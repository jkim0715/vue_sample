<template>
  <div class="card-body">
<<<<<<< HEAD
    <img v-if="this.movie.poster_path == null" src="@/assets/Alter_Image.jpeg" class="card-img-top" >
    <img v-else :src="backdrop_URL" class="card-img-top" >
    <h5 class="card-title">{{movie.title}}</h5>
=======

    
    <img v-if="this.movie.poster_path == null" src="@/assets/Alter_Image.jpeg" class="card-img-top" >
    <img v-else :src="backdrop_URL" class="card-img-top" >
    <h5 class="card-title">{{movie.title}}</h5>

>>>>>>> a1ff98325b631cea9f835d903197101b11824e2f
    <p>평점: {{movie.vote_average}}</p>
    <p><movieDetailfordb :movie="movie" :genres_all='genres' type="button" class= 'btn-btn-secondary ' /></p>
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
      movie:Object,
      genres:Object
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