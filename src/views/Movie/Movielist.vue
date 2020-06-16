<template>
  <div class='row'>
    <div class="col-lg-12">
      제목 : <input type="text" v-model="mvtitle" >
      <button @click="send" @keyup.enter="send">검색</button>
    </div>
    
    
    <div class="col-lg-12">
      <button @click="down(); receive()" > previous</button>
      <input type="number" v-model="page" @keypress.enter="receive">
      <button @click="up();receive()"> next</button>
    </div>
  <!-- 여기부터 장르 라디오 버튼 ?  -->

  <div class="col-lg-12">

    <div class="form-check form-check-inline" v-for="genre in genres" :key='genre.name' @change="sendgenre">

      <input class="form-check-input" type="checkbox" name="exampleRadios" :id="genre.name" :value="genre.id" v-model="selectg" >
      <label class="form-check-label" :for="genre.name">
        {{genre.name}}
      </label>
    </div>

      <!-- <button type='submit' @click="sendgenre"> 제출 </button> -->
  </div>


    <br>


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
        genres:null,
        selectg:[],
        mvtitle:null
      }
    },
    created(){
      this.receive()
      ,axios.get(SERVER_URL+'genre/')
      .then(res => {this.genres = res.data
      console.log(res)})
      .catch(err=> console.log(err))
    },
    
    methods:{
      receive(){
        axios.get(SERVER_URL+'?page='+this.page)
        .then(res=> {this.movies = res.data
          // console.log(res)
        })
        .catch(err=> console.log(err))
      },
      up(){
        this.page = (this.page)*1+1
      },
      down(){
        this.page = (this.page)*1-1
      },
      sendgenre(){
        if (this.selectg.length===0) {
          this.receive()
        } else {
          axios.get(SERVER_URL+'searchmovies/genres',{params: this.selectg})

          .then(res => {console.log(res)
          this.movies = res.data
          })
          .catch(err => console.log(err.response.data))
        }

        
      },
      send(){
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=4aa6196c39a63ef5473aa8c1e096c329&language=ko-K&query='+this.mvtitle+'&page='+this.page)
            .then(res=> {this.movies = res.data
            console.log(res)
            })
        },
        
    }
}
</script>

<style>

</style>