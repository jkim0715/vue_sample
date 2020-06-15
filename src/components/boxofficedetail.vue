<template>
  
  <div class="card" >
    <img :src="poster_URL" class="card-img-top" alt="로딩중">
    <div class="card-body">
      <p class="card-text">{{movie.overview}}</p>
  </div>
</div>
</template>

<script>

export default {
    name: 'boxofficedetail',

    props:{
      box:Object,
      movie:Object
    },
    data(){
      return{
        movies:null
      }
    },
    computed:{
      poster_URL(){
        const IMGURL='https://image.tmdb.org/t/p/original'
        return IMGURL+this.movie.poster_path
      },
    }
      
    
}
</script>

<style>
</style>