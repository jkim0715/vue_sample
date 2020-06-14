<template>
    <div>
     <button @click="movieDetail();commentDetail()" type="button" class="btn btn-warning" data-toggle="modal" :data-target="movieID_1">
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
                    <img :src='backdrop_URL' class="card-img-top" alt="대체 텍스트">
                    <hr>
                    <button v-for="genre in movie_db.genres" :key="genre">{{genre}}</button>
                    <br>
                    <button type="button" class="btn btn-success">{{movie.vote_average}} </button>
                    <br>
                    <br>

                    {{movie_db.overview}}
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
import movieComment from './movieComment.vue'
const SERVER_URL = 'http://127.0.0.1:8000/movies/detail/'

export default {
    name:'movieDetailfordb',
    data(){
        return{
            movie_db : [],
            comments : null,
        }
    },
    components:{
        movieComment
    },
    props:{
        movie:Object
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
      }
    },
    methods:{
        movieDetail(){
            console.log(SERVER_URL+this.movie.id+'/')
            axios.get(SERVER_URL+this.movie.id+'/')
            .then(res=>{
                this.movie_db=res.data
            })
            .catch(err => console.log(err.response.data))
        },
        // 코멘트 받아오는 api 
        commentDetail(){
        axios.get('http://127.0.0.1:8000/movies/moviecomment/'+this.movie.id+'/')
        .then(res=> {
            this.comments = res.data
        })
    },
        

    }
}
</script>

<style>

</style>