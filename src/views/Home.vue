<template>
  <div class="row">
    <div class = 'col-sm-12 col-md-3'>
      boxofficetable
      <todayboxoffice />
    </div>
    <div class = 'col-sm-12 col-md-9'>
      상세정보 페이지
    </div>
  </div>
</template>

<script>
import todayboxoffice from '@/components/todayboxoffice.vue'


export default {
  name: 'Home',
  components: {
    todayboxoffice
  }
}
</script>
