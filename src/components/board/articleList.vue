<template>
   <tr>
      <th scope="row">{{index+1}}</th>
      <td >
          {{article.title}}
        </td>
      <td>{{article.user.username}}</td>
      <td>{{article.created_at}}</td>
      <td><button @click="selectarticlecomponent">간편히 보기</button></td>
      <td><button @click="selectarticle">크게보기</button></td>
      <td v-if="article.user.username===user"><button @click='deletearticle'>삭제</button></td>
    </tr>

</template>

<script>
export default {
   name:'articleList',
   data(){
     return{
       user: this.$cookies.get('username')
     }
   },
   props:{
       article: Object,
       index: Number
   },
   methods:{
    selectarticlecomponent(){
      this.$emit('select-indexcomponent',[this.article,this.index])

    },

    selectarticle(){
      this.$emit('select-index-data',[this.article,this.index])
     },
    deletearticle() {

        this.$emit('delete-index-data',[this.article.id,this.index])
      },
      
   }
}

</script>

<style>

</style>
