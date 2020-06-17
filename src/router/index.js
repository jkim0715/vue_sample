import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import LoginView from '@/views/Accounts/LoginView.vue'
import SignupView from '@/views/Accounts/SignupView.vue'
import AccountDetail from '@/views/Accounts/AccountDetail.vue'

import Movielist from '@/views/Movie/Movielist.vue'
import MovieRecommend from '@/views/Movie/MovieRecommend.vue'
import CheckBoxoffice from '@/views/Movie/CheckBoxoffice.vue'

import Board from '@/views/Board/Board.vue'
import ArticleCreate from '@/views/Board/ArticleCreate.vue'
import articleDetail from '@/views/Board/ArticleDetail.vue'
import ArticleUpdate from '@/views/Board/ArticleUpdate.vue'

import admin from '@/views/Admin/Admin.vue'

Vue.use(VueRouter)

  // const articleDetail ={
  //   template: '<div>articleDetail {{ $route.params.id}}</div>'
  // }


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
    component : AccountDetail,
    beforeEnter: (to, from, next) => {
      //1. 토큰값을 가지고 있는가?
      if(!Vue.$cookies.isKey('auth-token')){
        next('/accounts/login')
      }else{
        next()
      }
    }
  },
  {
    path : '/movielist',
    name: 'movielist',
    component : Movielist
  },
  {
    path : '/movierecommendation',
    name : 'recommend',
    component : MovieRecommend,
    beforeEnter: (to, from, next) => {
      //1. 토큰값을 가지고 있는가?
      if(!Vue.$cookies.isKey('auth-token')){
        next('/accounts/login')
      }else{
        next()
      }
    }
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
  },
  {
    path : '/articlecreate',
    name: 'articlecreate',
    component : ArticleCreate
  },
  {
    path : '/articleupdate',
    name: 'articleupdate',
    component : ArticleUpdate,
    props: true
  },
  {
    path : '/articledetail',
    name: 'articledetail',
    component : articleDetail,
    props: true
  },
  {
    path: '/admin',
    name: 'admin',
    component : admin
    
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
