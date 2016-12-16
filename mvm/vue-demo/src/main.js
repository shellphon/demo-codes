// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BugList from './components/BugList'
import ProjectList from './components/ProjectList'
import MemberList from './components/MemberList'
import BugItem from './components/BugItem'
import BugForm from './components/BugForm'

import VueResource from 'vue-resource'

import VueRouter from 'vue-router'

Vue.use(VueRouter);

Vue.use(VueResource);


const routes = [
  { path: '/bugs', component: BugList },
  { path: '/members', component: MemberList },
  {
  	path:'/projects', 
  	component: ProjectList
  },
  {
  	path:'/bug/:id',
  	component: BugItem
  },
  {
    path:'/addbug',
    component: BugForm
  },
  {
    path:'/editbug/:id',
    component: BugForm
  },
  {path:'*', redirect: '/bugs'}
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
