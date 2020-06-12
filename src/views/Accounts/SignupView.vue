<template>
  <div>
    <h1>Signup</h1>
        <form>
            <div class="form-group">
                <label for="username" class="float-left">username</label>
                <input class="form-control" v-model="signupData.username" id='username' type="text">
            </div>
            <div class="form-group">
                <label for="password1" class="float-left">pwd1</label>
                <input class="form-control" v-model="signupData.password1" id='password1' type="password">
            </div>
            <div class="form-group">
                <label for="password2" class="float-left">pwd2</label>
                <input class="form-control" v-model="signupData.password2" id='password2' type="password">
            </div>
            <div class="form-group">
                <button class="btn btn-primary" @click.prevent="signup"> signup</button>
            </div>
        </form>
  </div>
</template>

<script>
export default {
    name:'SignupView',
    data(){
    return{
      signupData:{
        username:null,
        password1:null,
        password2:null,
         }
     }
    },
    methods:{
        signup(){
        this.$emit('submit-signup-data',this.signupData)
    }
  }
}

</script>

<style>

</style>