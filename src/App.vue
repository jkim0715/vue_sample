<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          
          <li class="nav-item ">
            <img src="@/assets/logo.png" width="40" height="40" alt="" loading="lazy">
          </li>

          <li class="nav-item ">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!isLoggedIn" :to="{name:'login'}" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="isLoggedIn" @click.native= "logout" to="/" class="nav-link">Logout </router-link> 
          </li>
          <li class="nav-item">
            <router-link v-if="!isLoggedIn" :to="{name:'signup'}" class="nav-link">signup</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'detail'}" class="nav-link">detail</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'movielist'}" class="nav-link">movielist</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'boxoffice'}" class="nav-link">boxoffice</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'board'}" class="nav-link">board</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'recommend'}" class="nav-link">recommend</router-link>
          </li>

        </ul>
      </div>

    </nav>


    <!-- <div id="nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link v-if="!isLoggedIn" :to="{name:'login'}">Login</router-link>
      <router-link v-if="isLoggedIn" @click.native= "logout" to="/" >Logout </router-link> 
      <router-link v-if="!isLoggedIn" :to="{name:'signup'}">signup</router-link>
      <router-link :to="{name:'detail'}">detail</router-link>
      <router-link :to="{name:'movielist'}">movielist</router-link>
      <router-link :to="{name:'boxoffice'}">boxoffice</router-link>
      <router-link :to="{name:'board'}">board</router-link>
      <router-link :to="{name:'recommend'}">recommend</router-link>
      <router-link :to="{name:'admin'}">admin</router-link> 
     </div> -->
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
      
      axios.post(SERVER_URL+'/rest-auth/login/', loginData)
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
  background-color: darkgrey;
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
