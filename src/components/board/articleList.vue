<template>
   <tr>
      <th scope="row">{{index+1}}</th>
      <td>
          {{article.title}}
        </td>
      <td>{{article.user.username}}</td>
      <td>{{article.created_at}}</td>
      <td @click="deletearticle">삭제</td>
    </tr>

</template>

<script>
// import axios from 'axios'
export default {
   name:'articleList',
   props:{
       article: Object,
       index: Number
   },
   methods:{
       deletearticle() {

        this.$emit('delete-index-data',[this.article.id,this.index])
       }
   }
}
</script>

<style>

</style>