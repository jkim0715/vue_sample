<template>
  
  <div class="card" >
    
    <img v-if="this.movie.poster_path == null" src="@/assets/Alter_Image.jpeg" class="card-img-top" >
    <img v-else :src="poster_URL" class="card-img-top" >

    <div class="card-body">
      <p class="card-text">{{movie.overview}}</p>
  </div>
</div>
</template>

<script>
// import vuev from '../../public/Alter_image.jpeg'
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