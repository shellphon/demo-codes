// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'

Vue.use(VueRouter);

const userData = [
	{
		name:'t1',age:24,job:'student'
	},{
		name:'t2',age:26,job:'engineer'
	},{
		name:'t3',age:30,job:'ceo'
	}
];

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const User = { 
	template: `<div>
				<p>{{$route.params.id}}</p>
				<router-link :to="$route.params.id+'/age'">{{$route.params.id}}age</router-link>
				<router-link :to="$route.params.id+'/job'">{{$route.params.id}}job</router-link>
				<router-view></router-view>
			</div>`,
	watch:{
		'$route': function(toVal, fromVal){
			console.log(fromVal.params.id+'->'+toVal.params.id);
		}
	}
 };

 const UserAge = {
 	template:'<span>{{$route.params.id}} age</span>'
 }
 const UserJob = {
 	template:'<span>{{$route.params.id}} job</span>'
 }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  {
  	path:'/user/:id', component: User,
  	children: [{
  		path:'age',
  		component: UserAge
  	},{
  		path:'job',
  		component: UserJob
  	}]
	},
	{path:'/user/*', redirect: '/user/1'},
  {path:'*', redirect: '/foo'}
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
