import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import LoginView from '@/views/Accounts/LoginView.vue'
import SignupView from '@/views/Accounts/SignupView.vue'
import AccountDetail from '@/views/Accounts/AccountDetail.vue'

import Movielist from '@/views/Movie/Movielist.vue'
import MovieRecommend from '@/views/Movie/MovieRecommend.vue'
import CheckBoxoffice from '@/views/Movie/CheckBoxoffice.vue'

import Board from '@/views/Board.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts/login',
    name : 'login',
    component : LoginView
  },
  {
    path: '/accounts/signup',
    name : 'signup',
    component: SignupView
  },
  {
    path: '/accounts/detail',
    name: 'detail',
    component : AccountDetail
  },
  {
    path : '/movielist',
    name: 'movielist',
    component : Movielist
  },
  {
    path : '/movierecommendation',
    name : 'recommend',
    component : MovieRecommend
  },
  {
    path : '/checkboxoffice',
    name : 'boxoffice',
    component : CheckBoxoffice
  },
  {
    path : '/board',
    name: 'board',
    component : Board
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
