<template>
    <div>
      <h1>Login</h1>
      <form>
        <div class="form-group">
            <label for="username">username </label>
            <input class="form-control" v-model="loginData.username" id="username" type="text">
        </div>
        
        <div class="form-group">
            <label for="password">password </label>
            <input class="form-control" v-model="loginData.password" id="password" type="password">
        </div>
        <div>
            <button type='submit' class="btn btn-primary" @click.prevent="login">Login</button>
        </div>
      </form>
    </div>
</template>

<script>
export default {
    name:'LoginView',
    data(){
        return {
            loginData:{
                username:null,
                password:null
            }
        }
    },
    methods:{
        login(){
            this.$emit('submit-login-data',this.loginData)
        }
    }
}
</script>

<style>

</style>