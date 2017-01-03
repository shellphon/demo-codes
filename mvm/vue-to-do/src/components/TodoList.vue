<template>
  <div class="to-do-list">
    <ul class="todo-types">
      <li v-for="(obj, key) in filters" class="btn btn-default" :class="{'btn-success': key==visiableType}" role="button" @click="visiableType=key">{{obj.desc}}</li>
    </ul>
    <p v-show="filterTodos.length==0" style="text-align: center;">暂无对应信息</p>
    <ul class="todo-list">
      <TodoItem v-for='todo in filterTodos' :item="todo"></TodoItem>
    </ul>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import {mapGetters} from 'vuex'

const filters = {
  'all': { 
    type:'all',
    desc:'所有'  
  },
  'done':{
    type:'done',
    desc:'已完成'
  },
  'undone':{
    type:'undone',
    desc:'待完成'
  }
};

export default {
  name: 'TodoList',
  data:function(){
    return {
      visiableType:'all',
      filters:filters
    }
  },
  created:function(){
    this.$store.dispatch('fetchTodos');
  },
  components: {TodoItem},
  computed:{
    filterTodos (){
      return this[this.filters[this.visiableType]['type']];
    },
    all (){
      return this.$store.state.todos;
    },
    ...mapGetters({
      done: 'doneTodos',
      undone:'undoneTodos'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo-types li{
  margin-right: .5em;
}
.todo-list{
  list-style: none;
}
</style>
