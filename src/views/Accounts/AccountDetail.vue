<template>
  <div class ="row">
    <div class= "col-md-2">
      <p v-for="genre in genre_lists_str" :key="genre">{{genre}}</p>
    </div>
    <div class="col-md-10">
      <div class="row">
        <div class='card col-md-4'  v-for='movie in like_movies' :key="movie.id">
          <movieListDetail :movie='movie' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import movieListDetail from '../../components/movieListDetail.vue'
import axios from 'axios'
export default {
    name: 'AccountDetail',
    components:{
      movieListDetail
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
        var sortable = [];
            for (var genre_id in this.genre_count) {
                sortable.push([genre_id, this.genre_count[genre_id]]);
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });
        return sortable
        })
      .then((data)=>{
        console.log(data)
        for(let i =0; i<data.length;i++){
          this.genre_lists_str.push(this.genre_lists[`${data[i][0]}`] + `${data[i][1]}`)
        }
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