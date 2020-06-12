<template>
  <div>
      오늘의 박스 오피스 들어올곳
      <div class="row">
        <table class="table">
        <thead>
          <tr>
            <th scope="col">순위</th>
            <th scope="col">제목</th>
            <th scope="col">순위 변동</th>
            <th scope="col">신규진입</th>
            <th scope="col">자세히</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="boxoffice in boxoffices" :key="boxoffice.rnum">
            <th scope="row">{{boxoffice.rank}}</th>
            <td> {{boxoffice.movieNm}}</td>
            <td> {{boxoffice.rankInten}}</td>
            <td> {{boxoffice.rankOldAndNew}}</td>
            <td> 클릭</td>
          </tr>
        </tbody>
        </table>
      </div>
      
      
      
      
      
      
  </div>
</template>

<script>
import axios from 'axios'

const API_URL='http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key='
const Key = 'd93a43233a59ba9e241e833c89126e87'
// &targetDt=20120101


let today = new Date();   
const year = today.getFullYear(); // 년도
const month = ("0" + (today.getMonth() + 1)).slice(-2);  // 월
const date =("0" + (today.getDate() -1 )).slice(-2);  // 날짜
// 이거 1일 되면 어케 될지 모름 수정해야댐 






export default {
    name : 'todayboxoffice',
    data(){
        return{
            boxoffices:[]
        }
    },
    created(){
        axios.get(API_URL+Key+'&targetDt='+year+month+date)
        .then(res=> {
            // console.log(res.data.boxOfficeResult.dailyBoxOfficeList)
            this.boxoffices = res.data.boxOfficeResult.dailyBoxOfficeList
            
        })
        .catch(err=>console.log(err))
    },
    methods:{

    }

}
</script>

<style>

</style>