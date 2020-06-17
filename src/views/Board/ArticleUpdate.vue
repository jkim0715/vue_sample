<template>
  <div>
      <h1>Article Update</h1>
        <form>
            <div class="form-group">
                <label for="articleTitle">Title</label>
                <input type="text" class="form-control" id="articleTitle" aria-describedby="titleHelp" v-model="articleData.title">
                <small id="titleHelp" class="form-text text-muted">수정할 제목을 입력</small>
            </div>
            <div class="form-group">
                <label for="articleContent">Content</label>
                <textarea class="form-control" name="" id="articleContent" cols="30" rows="10" v-model="articleData.content"></textarea>
            </div>
            <button @click.prevent="updataArticle" type="submit" class="btn btn-primary">수정</button>
        </form>



  </div>    
</template>

<script>
import axios from 'axios'

export default {
    name:"ArticelUpdate",
    props:['articleNum'],
    data(){
        return{

            articleData:null,
            
        }
    },
    created(){
        axios.get('http://localhost:8000/reviews/detail/'+this.articleNum+'/')
        .then(res => {
            console.log(res)
            this.articleData = res.data
        })
    },
    methods:{
        updataArticle(){
            const config={
                headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`
                }
            }
            axios.post('http://localhost:8000/reviews/update/'+this.articleNum+'/',this.articleData,config)
            .then(res=> {console.log(res)
            this.$router.push({name:'board'})
            }
            )
        }
    }

}
</script>

<style>

</style>