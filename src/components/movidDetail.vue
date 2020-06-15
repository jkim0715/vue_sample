<template>
  <div>
     <button @click="movieDetail()" type="button" class="btn btn-warning" data-toggle="modal" :data-target="movieID_1">
        영화정보 상세보기 
    </button>

        <!-- Modal -->
    <div class="modal fade" :id="movieID_2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{movie.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src='backdrop_URL' class="card-img-top" alt="서버 로딩중 ">
                    <hr>
                    <button v-for="genre in movie.genres" :key="genre">{{genre}}</button>
                    <br>
                    <button type="button" class="btn btn-success">{{movie.vote_average}} </button>
                    <br>
                    <br>

                    {{movie.overview}}
                </div>
                <movieComment :comments ="comments" :movie_id="movie.id" />
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
      
  </div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = 'http://127.0.0.1:8000/movies/searchmovie/'
import movieComment from './movieComment.vue'

export default {
    name:'movieDetail',
    data(){
        return{
            movie:[],
            comments :[] ,
        }
    },
    components:{
        movieComment
    },
    props:{
        box:Object,
    },
    computed:{
      backdrop_URL(){
        const IMGURL='https://image.tmdb.org/t/p/original'
        return IMGURL+this.movie.backdrop_path
      },
      movieID_1(){
          return `#Modal${this.movie.id}`
      },
      movieID_2(){
          return `Modal${this.movie.id}`
      },
      Commenturl(){
          return `http://127.0.0.1:8000/movies/moviecomment/${this.movie.id}/`
      }
      
    },
    methods:{
        movieDetail(){
            axios.get(SERVER_URL+this.box.movieNm+'/')
            .then(res=> {
                this.movie = res.data
                axios.get('http://127.0.0.1:8000/movies/moviecomment/'+this.movie.id+'/')
                .then(res=> {
                this.comments = res.data
        })
                

            })
            .catch(this.movie = {
                overview:'서버에러 잡시 후에 시도해주세요'
            })
        },
        
}
}

</script>

<style>

</style>