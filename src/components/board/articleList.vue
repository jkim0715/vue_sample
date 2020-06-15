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
import axios from 'axios'
export default {
   name:'articleList',
   props:{
       article: Object,
       index: Number
   },
   methods:{
       deletearticle() {
           const config={
                headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                }
            }
           axios.post('http://localhost:8000/reviews/delete/'+this.article.id+'/', null, config )
           .then(res=> {
               console.log(res)
           })
       }
   }
}
</script>

<style>

</style>