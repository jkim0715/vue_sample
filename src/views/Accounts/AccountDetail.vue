<template>
  <div class ="row">
    <div class="col-md-6">
      <accountLikeMoives v-for="movie in like_movies" :key="movie.id" :movie="movie" />
    </div>
    <div class= "col-md-6">
      <p v-for="genre in genre_lists_str" :key="genre">{{genre}}</p>
    </div>
  </div>
</template>

<script>
import accountLikeMoives from '@/components/account/accountLikeMovies'

import axios from 'axios'
export default {
    name: 'AccountDetail',
    components:{
      accountLikeMoives
    },
    data() {
      return {
        like_movies: [],
        genre_lists:{},
        genre_count:{},
        genre_lists_str:[]
      }
    },
    methods:{
      genreCount(){
        this.like_movies.forEach(element =>{
          element.genres.forEach(item=>{
              if(!(item in this.genre_count)){
                this.genre_count[`${item}`] = 1
              }else{
                this.genre_count[`${item}`] = this.genre_count[`${item}`]+1
              }
          })
        })
      },
    },
    created(){
      const config = {
        headers: {
          Authorization: `Token ${this.$cookies.get('auth-token')}`
                }
          } 
      axios.post('http://localhost:8000/movies/getlikemovies/',null, config)
      .then(res=>{
        this.like_movies = res.data
        this.genreCount()
      })
      .then(()=>{
        Object.keys(this.genre_count).forEach(genre=>{
          console.log(genre)
          this.genre_lists_str.push(this.genre_lists[`${genre}`])
        })
      })
      axios.get('http://localhost:8000/movies/genre/',null, config)
      .then(res=>{
        res.data.forEach(item=>{
          this.genre_lists[`${item.id}`] = item.name
        })
      })
    }
}
</script>

<style>

</style>