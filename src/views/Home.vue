<template>
  <div class="row">
    <div class = 'col-sm-12 col-md-6'>
      boxofficetable
      <todayboxoffice @submit-box-data='save_box'/>
    </div>
    <div class = 'col-sm-12 col-md-6'>
      상세정보 페이지
      <boxofficedetail :box='boxdata' />
    </div>
  </div>
</template>

<script>
import todayboxoffice from '@/components/todayboxoffice.vue'
import boxofficedetail from '@/components/boxofficedetail.vue'

export default {
  name: 'Home',
  components: {
    todayboxoffice,boxofficedetail
  },
  data(){
    return{
      boxdata:[]
    }
  },
  methods:{
    save_box(box){
      this.boxdata = box 
    }
  }
}
</script>
