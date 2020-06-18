<template>
  <div class="row">
    

    <div class = 'col-sm-12 col-md-12 col-lg-6'>
      boxofficetable
      <todayboxoffice @submit-box-data='save_box'/>
    </div>
    <div class = 'col-sm-12 col-md-12 col-lg-6'>
      상세정보 페이지
      <boxofficedetail v-if="movies" :box='boxdata' :movie='movies' />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import todayboxoffice from '@/components/todayboxoffice.vue'
import boxofficedetail from '@/components/boxofficedetail.vue'
export default {
  name: 'Home',
  components: {
    todayboxoffice,boxofficedetail
  },
  data(){
    return{
      boxdata:[],
      movies:null
    }
  },
  methods:{
    save_box(box){
      this.boxdata = box
      console.log(this.boxdata)
      axios.get(process.env.VUE_APP_SERVER_URL+'movies/searchmovie/'+this.boxdata.movieNm+'/')
            .then(res=> {
                console.log(res)
                this.movies = res.data
                // console.log(this.box.movieNm)
            })
            .catch(err=> {console.log(err.response.data)
            this.movies.poster_path=null
            this.movies.overview='데이터가 없습니다.'

            }) 
    }
  }
}
</script>

<style  scoped>
#logo{
  justify-content: center;
}

</style>