<template>
  <div>
      일별 날짜 기준
      <br>
      <input type="date" name="releasedate" v-model="date" @input="dateupdated">
      <div class="row">
        <table class="table">
        <thead>
          <tr>
            <th scope="col">순위</th>
            <th scope="col">제목</th>
            <th scope="col">누적 관객(날짜 기준)</th>
            <th scope="col">자세히</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="boxoffice in boxoffices" :key="boxoffice.rnum">
            <th scope="row">{{boxoffice.rank}}</th>
            <td> {{boxoffice.movieNm}}</td>
            <td> {{boxoffice.audiAcc}}</td>
            <td> <movieDetail :box="boxoffice"  type="button" class= 'btn-btn-primary' /></td>
          </tr>
        </tbody>
        </table>
      </div>

  </div>
</template>


<script>
import axios from 'axios'
import movieDetail from '../../components/movidDetail.vue'

const API_URL='http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key='
const Key = 'd93a43233a59ba9e241e833c89126e87'


export default {
    name : 'CheckBoxoffice',
    components:{
      movieDetail
    },
    data(){
      return{
        date:null,
        boxoffices:[],
        computeDate:null
      }
    },
    computed:{
      computedDate(){
        return this.date.slice(0,4)+this.date.slice(5,7)+this.date.slice(-2)
      }
    },
   
    methods:{
      dateupdated(){
      axios.get(API_URL+Key+'&targetDt='+this.computedDate)
      .then(res=> {
          console.log(res.data.boxOfficeResult.dailyBoxOfficeList)
          this.boxoffices = res.data.boxOfficeResult.dailyBoxOfficeList
          
      })
      .catch(err=>console.log(err))
    }
    }
    
}
</script>

<style>

</style>