<template>
  <div>
     <p>
     <button @click="movieDetail()"  type="button" class="btn btn-warning" data-toggle="modal" :data-target="movieID_1">
        영화정보 상세보기
    </button>
    </p> 

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
                    <img v-if="this.movie.backdrop_path == null" src="@/assets/Alter_Image.jpeg" class="card-img-top" >
                    <img v-else :src="backdrop_URL" class="card-img-top" >
                    <hr>
                    <button v-for="genre in movie.genres" :key="genre">{{genres[`${genre}`]}}</button>
                    <br>
                    <button type="button" class="btn btn-success">{{movie.vote_average}} </button>
                    <br>
                    <br>

                    {{movie.overview}}
                </div>
                <movieComment :comments ="comments" :movie_id="movie.id"  @delete-comment="deleteComment"/>
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

export default {
    name:'movieDetail',
    data(){
        return{
            movie:[],
            comments :[] ,
            genres:{},
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
          return `#Modal${this.box.rnum}`
      },
      movieID_2(){
          return `Modal${this.box.rnum}`
      },
      Commenturl(){
          return process.env.VUE_APP_SERVER_URL+`movies/moviecomment/${this.movie.id}/`
      }
      
    },
    methods:{
        movieDetail(){
        const config = {
        headers: {
          Authorization: `Token ${this.$cookies.get('auth-token')}`
            }
        } 
        axios.get(process.env.VUE_APP_SERVER_URL+'movies/searchmovie/'+this.box.movieNm+'/')
        .then(res=> {
            console.log(res.data)
            this.movie = res.data
            axios.get(process.env.VUE_APP_SERVER_URL+'movies/moviecomment/'+this.movie.id+'/')
            .then(res=> {
            this.comments = res.data
            })
        })
        .catch(this.movie = {
            overview:'서버에러 잡시 후에 시도해주세요'
        })

        axios.get(process.env.VUE_APP_SERVER_URL+'movies/genre/',null, config)
        .then(res=>{
            res.data.forEach(item=>{
                this.genres[`${item.id}`] = item.name
            })
                console.log(this.genres)
            })
        },
        deleteComment(commentId){
            console.log('hihi')
            const config = {
                headers: {
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                    }
            } 
            axios.post(process.env.VUE_APP_SERVER_URL+'movies/deletemoviecomment/'+commentId+'/',null, config)
            .then(res=>{
                console.log(res.data)
            })
        },
        
    },
}

</script>

<style>

</style>