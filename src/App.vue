<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="!isLoggedIn" :to="{name:'login'}">Login</router-link> |
      <router-link v-if="isLoggedIn" @click.native= "logout" to="/" >Logout </router-link> 
      <router-link v-if="!isLoggedIn" :to="{name:'signup'}">signup</router-link> |
      <router-link :to="{name:'detail'}">detail</router-link> |
      <router-link :to="{name:'movielist'}">movielist</router-link> |
      <router-link :to="{name:'boxoffice'}">boxoffice</router-link> |
      <router-link :to="{name:'board'}">board</router-link> |
      <router-link :to="{name:'recommend'}">recommend</router-link> |
      <!-- <router-link :to="{name:'admin'}">admin</router-link> | -->
    </div>
    <div class="container">
    <router-view @submit-login-data='login' @submit-signup-data='signup' />
    </div>
    <!-- <admin /> -->
  </div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = 'http://localhost:8000'

export default {
  name: 'App',
  components:{
  },
  data() {
    return {
      isLoggedIn: false, 
      username_tmp:null
    }
  },
  created(){
    if(this.$cookies.isKey('auth-token')){
      this.isLoggedIn = true}
      else{
        this.isLoggedIn = false
    }
  },
  methods: {
    setCookie(token) {
      this.$cookies.set('auth-token', token)
      this.isLoggedIn = true
    },
    login(loginData) {
      
      axios.post('http://localhost:8000/rest-auth/login/', loginData)
        .then(res => {
          this.setCookie(res.data.key)
          this.$cookies.set('username',loginData.username)

          const requestHeaders = {
        headers: {
          'Authorization': `Token ${this.$cookies.get('auth-token')}`
        }
      }
          axios.get(SERVER_URL+'/rest-auth/user/',requestHeaders)
          .then(res=>{
            this.$cookies.set('id',res.data.pk) 
          })
          // console.log(loginData.username)
          this.$router.push({ name: 'boxoffice'})
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    signup(signupData){
      
      axios.post(SERVER_URL + '/rest-auth/signup/',signupData)
      .then(res=> {
        this.setCookie(res.data.key)
        console.log(res.data)

        this.$cookies.set('username',signupData.username)
        const requestHeaders = {
        headers: {
          'Authorization': `Token ${this.$cookies.get('auth-token')}`
        }
      }
        axios.get(SERVER_URL+'/rest-auth/user/',requestHeaders)
          .then(res=>{
            this.$cookies.set('id',res.data.pk) 
          })
        this.$router.push({name:'boxoffice'})
      })
      .catch(err=>console.log(err.response.data))
    },
    logout() {
      const requestHeaders = {
        headers: {
          'Authorization': `Token ${this.$cookies.get('auth-token')}`
        }
      }
      
      axios.post(SERVER_URL + '/rest-auth/logout/', null, requestHeaders)
        .then(() => {
          this.$cookies.remove('auth-token')
          this.$cookies.remove('username')
          this.isLoggedIn = false
          this.$router.push({ name: 'boxoffice'})
        })
        .catch(err => console.log(err.response.data))
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
