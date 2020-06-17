<template>
  <div>
    <div class="card">
        <div class="card-header">
           <p> {{article.id}} 번째 글</p>
           <p> 작성 시간 : {{article.created_at}}</p>
        </div>
        
        <div class="card-body">
            <h5 class="card-title ">{{article.title}}</h5>
            <p class="card-text">{{article.content}}</p>
            
        </div>
    </div>

  </div>
</template>

<script>
export default {
    name:'articlePreview',
    props:{
        article:Object
    }
}
</script>

<style>

</style>