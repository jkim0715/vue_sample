<template>
    <div>

     <button  @click="movieDetail();commentDetail();genresToString();add(modalMovie.id)" type="button" class="btn btn-warning" data-toggle="modal" :data-target="movieID_1">
        영화정보 상세보기
    </button>


        <!-- Modal -->
    <div class="modal fade" :id="movieID_2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{modalMovie.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img v-if="this.movie.poster_path == null" src="@/assets/Alter_Image.jpeg" class="card-img-top" >
                    <img v-else :src="backdrop_URL" class="card-img-top" >
                    <hr>
                    <button v-for="genre in movie_db.genres" :key="genre">{{genres[`${genre}`]}}</button>
                    <br>
                    <button type="button" class="btn btn-success">{{modalMovie.vote_average}} </button>
                    <br>
                    <br>
                    {{movie.overview}}
                </div>
                <movieComment :comments ="comments" :movie_id="modalMovie.id"   @delete-comment="deleteComment" @createcomment="createComment"/>
                <div class="modal-footer">
                    <button @click="like" type="button">좋아요</button>
                    <span>{{modalMovie.no_of_like_users}}명이 좋아합니다.</span>
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
    name:'movieDetailfordb',
    data(){
        return{
            movie_db : [],
            genres:{},
            comments : [],
            modalMovie : this.movie
        }
    },
    components:{
        movieComment
    },
    props:{
        movie:Object,
        genres_all:Object
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
            console.log(process.env.VUE_APP_SERVER_URL+'movies/detail/'+this.movie.id+'/')
            axios.get(process.env.VUE_APP_SERVER_URL+'movies/detail/'+this.movie.id+'/')
            .then(res=>{
                this.movie_db=res.data
            })
            .catch(err => console.log(err.response.data))
        },
        // 코멘트 받아오는 api 
        commentDetail(){
        axios.get(process.env.VUE_APP_SERVER_URL+'movies/moviecomment/'+this.movie.id+'/')
        .then(res=> {
            this.comments = res.data
        })
        .catch(err=> console.log(err.response))
    },
        like(){
            const config={
                headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                }
            }
            axios.post(process.env.VUE_APP_SERVER_URL+'movies/like/'+this.movie.id+'/',null,config)
            .then(res => {
                this.modalMovie = res.data
                console.log(res.data)}
                )
            .catch(err => console.log(err.response.data))

        },
        genresToString(){
        const config = {
            headers: {
                Authorization: `Token ${this.$cookies.get('auth-token')}`
            }
        } 
        axios.get(process.env.VUE_APP_SERVER_URL+'movies/genre/',null, config)
        .then(res=>{
            console.log(res.data)
            res.data.forEach(item=>{
            console.log(item)
            this.genres[`${item.id}`] = item.name
                })
            return this.genres
            })
        .then(data=>{
            console.log(data)
        })
        },
        createComment(movie){
            this.modalMovie =movie
        },

        deleteComment(commentId){
            const config = {
                headers: {
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                    }
            } 
            axios.post(process.env.VUE_APP_SERVER_URL+'movies/deletemoviecomment/'+commentId+'/',null, config)
            .then(res=>{
                console.log(res.data)
                this.commentDetail()
            })
        },

        add(id){
            axios.get(process.env.VUE_APP_SERVER_URL+'movies/add_movie/'+ id )
            .then(res => {console.log(res)
            // alert('추가 성공')
            })
            .catch(err=>{
                console.log(err)
            // alert('이미 존재합니다')
            }
            )
        }

        

    }
}
</script>

<style>

</style>