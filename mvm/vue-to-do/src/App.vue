<template>
  <div id="app">
    <AddToDo></AddToDo>
    <TodoList></TodoList>
  </div>
</template>

<script>
import AddToDo from './components/AddTodo'
import TodoList from './components/TodoList'

export default {
  name: 'app',
  components: {
    AddToDo,
    TodoList
  }
}
</script>

<style>
#app {
 /*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
 margin-top: 60px; */
}
</style>
