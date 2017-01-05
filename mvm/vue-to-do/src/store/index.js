import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);
let idIndex = 0;

const gtoDos = (function(){
	var todos = [];
	var obj = function(){
		this.init();
		return this;
	};
	function copyArr(arr){
		return arr.map((e)=>{
			if(typeof e === 'object'){
				return Object.assign({},e)
			}else{
				return e
			}
		})
	}
	obj.prototype = {
		init(){

			var stores = window.localStorage.getItem('vtd-todos');
			if(stores){
				todos = JSON.parse(stores);
			}
		},
		getTodos() {
			return copyArr(todos)//.slice();
		},
		addTodo(todo) {
			todos.push(todo);
			this.refreshTodos();
		},
		deleteTodo(id) {
			todos = todos.filter(e=>{
				if(e.id==id){
					return false;
				}
				return true;
			});
			this.refreshTodos();
		},
		toggleTodo(id) {
			todos = todos.map(e=>{
				if(e.id==id){
					e.done = !e.done;
				}
				return e;
			});
			this.refreshTodos();
		},
		editTodo(item) {
			todos = todos.map(e=>{
				if(e.id==item.id){
					e = item;
				}
				return e;
			});
			this.refreshTodos();
		},
		refreshTodos() {
			window.localStorage.setItem('vtd-todos', JSON.stringify(todos));
		}
	};
	return new obj();
})();

export default new Vuex.Store({
	state: {
		todos:[
		
		]
	},

	mutations: {
		getTodos (state, list){
			var list = list.sort((a,b)=>a.id<b.id);
			idIndex = list.length && list[0].id || 0;
			state.todos = list;
		},
		addTodo (state, one){
			state.todos.unshift(Object.assign({}, one));
		},
		editTodo (state, one){
			let index=-1;
			state.todos.forEach((e,i)=>{
				if(e.id==one.id){
					index = i
				}
			})
			index>-1?state.todos[index].desc = one.desc:''
		},
		toggleTodo (state, item){
			let index=-1,
				status;
			state.todos.forEach((e,i)=>{
				if(e.id==item.id){
					index = i
					status = e.done
				}
			})
			//console.log('mutations ',index ,status, item.done)
			index>-1?state.todos[index].done = !status:''
		},
		deleteTodo (state, item){
			let index = -1;
			state.todos.filter((e,i)=>{
				if(e.id==item.id){
					index = i
				}
			})
			index>-1?state.todos.splice(index,1):''
		}
	},
	getters:{
		doneTodos: state=>{
			//console.log('get dones')
			let done = state.todos.filter(todo => todo.done)
			//console.log(done);
			return done
		},
		undoneTodos: state=>{
			return state.todos.filter(todo => !todo.done)
		}
	},

	actions:{
		fetchTodos ({commit}){
			 const res = gtoDos.getTodos();
			 commit('getTodos',res);
		},
		newTodo ({commit}, todo){
			idIndex++;
			todo.id = idIndex;
			gtoDos.addTodo(todo);
			commit('addTodo', todo);
		},
		toggleTodo ({commit}, item){
			gtoDos.toggleTodo(item.id);
			commit('toggleTodo', item);
		},
		deleteTodo  ({commit}, todo){
			gtoDos.deleteTodo(todo.id);
			commit('deleteTodo', todo);
		},
		editTodo ({commit}, todo){
			gtoDos.editTodo(todo);
			commit('editTodo', todo);
		}
	}
})
