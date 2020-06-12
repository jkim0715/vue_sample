<template>
  <div>
     <button type="button" class="btn btn-warning" data-toggle="modal" :data-target="movieID_1">
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
                    <button type="button" class="btn btn-success">{{movie.user_rating}} </button>
                    <br>
                    <br>

                    {{movie.overview}}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
      
  </div>
</template>

<script>
export default {
    name:'movieDetail',
    props:{
        movie:Object,
    },
    computed:{
      backdrop_URL(){
        return this.movie.backdrop_url
      },
      movieID_1(){
          return `#Modal${this.movie.id}`
      },
      movieID_2(){
          return `Modal${this.movie.id}`
      }
    }
}

</script>

<style>

</style>