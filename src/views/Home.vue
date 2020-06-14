<template>
  <div class="row">
    <div class = 'col-sm-12 col-md-6'>
      boxofficetable
      <todayboxoffice @submit-box-data='save_box'/>
    </div>
    <div class = 'col-sm-12 col-md-6'>
      상세정보 페이지
      <boxofficedetail :box='boxdata' :movie='movies' />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = 'http://127.0.0.1:8000/movies/'
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
      axios.get(SERVER_URL+this.box.movieNm+'/')
            .then(res=> {
                this.movies = res.data
                console.log(this.box.movieNm)

            })
            .catch(err=> console.log(err.response.data)) 
    }
  }
}
</script>
