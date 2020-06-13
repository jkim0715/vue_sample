<template>
  <div class='row'>
    <div class="col-lg-12">
      <button @click="down(); receive()" > previous</button>
      <input type="number" v-model="page" @keypress.enter="receive">
      <button @click="up();receive()"> next</button>
      
    </div>
    <div class='card col-lg-4'  v-for='movie in movies.results' :key="movie.id">
      
      <movieListDetail :movie='movie' />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = 'http://127.0.0.1:8000/movies/'

import movieListDetail from '../../components/movieListDetail.vue'

export default {
    name: 'Movielist',
    components:{
      movieListDetail
    },
    data(){
      return{
        movies:[],
        page: 1,
        
      }
    },
    created(){
      this.receive()
    },
      
    methods:{
      receive(){
        axios.get(SERVER_URL+'?page='+this.page)
        .then(res=> {this.movies = res.data
          console.log(res)
        })
        .catch(err=> console.log(err))
      },
      up(){
        this.page = (this.page)*1+1
      },
      down(){
        this.page = (this.page)*1-1
      }
    }
}
</script>

<style>

</style>