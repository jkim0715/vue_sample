<template>
  <div>
      <h1>Article Create</h1>
        <form>
            <div class="form-group">
                <label for="articleTitle">Title</label>
                <input type="text" class="form-control" id="articleTitle" aria-describedby="titleHelp" v-model="article.title">
                <small id="titleHelp" class="form-text text-muted">리뷰 제목을 입력해 주세용</small>
            </div>
            <div class="form-group">
                <label for="articleContent">Content</label>
                <textarea class="form-control" name="" id="articleContent" cols="30" rows="10" v-model="article.content"></textarea>
            </div>
            <button @click.prevent="createArticle" type="submit" class="btn btn-primary">작성</button>
        </form>
  </div>
</template>

<script>


import axios from 'axios'
export default {
    name:'articleCreate',
    data() {
        return {
            article :{
                title : null,
                content : null
            }
        }
    },
    methods:{
        createArticle() {
            const config={
                headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                }
            }
            axios.post(process.env.VUE_APP_SERVER_URL+'reviews/create/', this.article, config)
            .then(res=> {
                console.log(res.data)
                this.$router.push({name:'board'})
            })
        }
    },

}
</script>

<style>

</style>