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
	obj.prototype = {
		init(){

			var stores = window.localStorage.getItem('vtd-todos');
			if(stores){
				todos = JSON.parse(stores);
			}
		},
		getTodos() {
			return todos;
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
			state.todos = list.slice(0);
		},
		addTodo (state, one){
			state.todos.unshift(one);
		},
		editTodo (state, one){
			state.todos = state.todos.map(e=>{
				if(e.id==one.id){
					e = one;
				}
				return e;
			})
		},
		toggleTodo (state, item){
			
		},
		deleteTodo (state, item){
			state.todos = state.todos.filter(e=>{
				if(e.id==item.id){
					return false;
				}
				return true;
			})
		}
	},
	getters:{
		doneTodos: state=>{
			return state.todos.filter(todo => todo.done)
		},
		undoneTodos: state=>{
			return state.todos.filter(todo => !todo.done)
		}
	},

	actions:{
		/*fetchTodos ({commit}){

			Vue.http.get('/api/todos').then((response) => {
		        // success callback
		        //console.log('success');
				commit('getTodos',response.body.result.data);
		        
		      }, (response) => {
		        console.log('error');
		      });
		},
		newTodo ({commit}, todo){
			Vue.http.post('/api/addtodo', todo).then((response) => {
		        // success callback
		        //console.log('success');
				commit('addTodo', todo);
		        
		      }, (response) => {
		        console.log('error');
		      });
		},
		toggleTodo ({commit}, todo){
			Vue.http.post('/api/done', todo).then((response) => {
		        // success callback
		        //console.log('success');
				commit('toggleTodo', todo);
		        
		      }, (response) => {
		        console.log('error');
		      });
		},
		deleteTodo  ({commit}, todo){
			Vue.http.post('/api/delete', todo).then((response) => {
		        // success callback
		        //console.log('success');
				commit('deleteTodo', todo);
		        
		      }, (response) => {
		        console.log('error');
		      });
		}*/


		fetchTodos ({commit}){
			 const res = gtoDos.getTodos();
			 commit('getTodos',res);
		},
		newTodo ({commit}, todo){
			/*return new Promise((s,j)=>{
				j();
			})*/
			idIndex++;
			todo.id = idIndex;
			 gtoDos.addTodo(todo);
				commit('addTodo', todo);
		},
		toggleTodo ({commit}, todo){
			gtoDos.toggleTodo(todo.id);
				commit('toggleTodo', todo);
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