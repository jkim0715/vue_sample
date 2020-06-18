<template>
  <div class='row'>
    <div class="col-lg-12">
      <button @click="down(); send()" > previous</button>
      <input type="number" v-model="page" @keypress.enter="receive">
      <button @click="up();send()"> next</button>
    </div>
    <div class='col-lg-12'>
      제목 : <input type="text" v-model="title" >
      <button @click="send" @keyup.enter="send">검색</button>
    </div>
    <div class="col-lg-3" v-for='movie in movies' :key="movie.id">
        <div class="card-body">
            <img :src='"https://image.tmdb.org/t/p/original"+movie.poster_path' class="card-img-top" alt="이미지가 없습니다.">
            <h5 class="card-title">{{movie.title}}</h5>
            <p>평점: {{movie.vote_average}}</p>
            <button @click.prevent='add(movie.id)' >추가하기</button>
        </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'


export default {
    name: 'admin',
    data(){
        return{
            title:null,
            movies:[],
            page:1
        }
    },
    computed:{
      backdrop_URL(){
        const IMGURL='https://image.tmdb.org/t/p/original'
        return IMGURL+this.movie.poster_path
      },
    },
    methods:{
        send(){
            axios.get('https://api.themoviedb.org/3/search/movie?'+process.env.MOVIE_APIKEY+'&language=ko-K&query='+this.title+'&page='+this.page)
            .then(res=> {this.movies = res.data.results
            console.log(res)
            })
        },
        up(){
            this.page = (this.page)*1+1
        },
        down(){
            this.page = (this.page)*1-1
        },
        add(id){
            axios.get(process.env.VUE_APP_SERVER_URL+'movies/add_movie/'+ id )
            .then(res => {console.log(res)
            alert('추가 성공')
            })
            .catch(err=>{
                console.log(err)
            alert('이미 존재합니다')
            }
            )
        }
        
    }
}
</script>

<style>

</style>