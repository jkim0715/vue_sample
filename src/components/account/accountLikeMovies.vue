<template>
  <div>
      <span>{{movie.title}}</span>
  </div>
</template>

<script>
export default {
    name:'accountLikeMovies',
    props:{
        movie: Object,
    }
}
</script>

<style>

</style>