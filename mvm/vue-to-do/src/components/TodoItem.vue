<template>
  <li class="todo-item" :class='{editing: editable}'>
    <div class="view">
      <input type="checkbox" class="cb" v-detect="item.done" @change="toggleTodo(item)">
      <label v-on:dblclick="toEdit()">{{item.desc}}</label>
      <a class="delete" @click="deleteItem">×</a>
    </div>
    <div class="col-sm-10 edit-input">
      <input type="text" class="form-control" v-auto-focus="editable" :value="item.desc"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
    </div>
  </li>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'TodoItem',
  props: ['item'],
  data: function(){
    return {
      input:'',
      editable:false
    }
  },
  directives:{
    detect:function(el, binding){
       // console.log(el.checked, binding.value)
        el.checked = binding.value
    },
    'auto-focus': function(el, binding){
      //console.log(binding.value);
      if(binding.value){
        el.focus();
      }
    }
  },
  methods:{
    doneEdit (e) {
      const value = e.target.value.trim();
      const { item } = this;
      if (!value) {
        this.deleteItem();
      } else if (this.editable) {
        item.desc = value;
        this.$store.dispatch('editTodo', item);
        this.editable = false
      }
    },
    cancelEdit (e) {
      e.target.value = this.item.desc
      this.editable = false
    },
    toEdit(){
      this.editable = true;
    },
    deleteItem (){
      const todo = this.item;
     
      this.$store.dispatch('deleteTodo', todo);

    },
    toggleTodo (){
      const todo = this.item;
      this.$store.dispatch('toggleTodo', todo);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo-item{
  height: 40px;
  font-size: 18px;
}
.todo-item label{
    width: 530px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 18px;
    line-height: 40px;
    display: inline-block;
}
.todo-item .delete{
  font-size: 26px;
  text-decoration: none;
  color: #f00;
  float: right;
  cursor: pointer;
}
.editing .view{
  display: none;
}
.todo-item .edit-input{
  display: none;
}
.editing .edit-input{
  display: block;
}
.todo-item .cb{
  float: left;
  position: relative;
  width: 20px;
  height: 20px;
  top: 6px;
  margin-right: .5em;
  display: inline-block;
  border-radius: 50%;
  -webkit-appearance: none;
  outline: none;
}
.todo-item .cb:after{
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAYFBMVEUAAABDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEf///9Hoku83b1DoEfs9eyMxY7B4MKm0qij0KV5u3xzuHbp9Om327m32riIw4rKEKF0AAAAEXRSTlMAVAb64NqsiVsD8+TjppRcB2wO/toAAACHSURBVBjTbZFZDsMwCETxbqdNWvCSrcv9b1nJjazE4n0+CTEMUJFi1Gowo5DQEIa2JcZlIyMOFVwqGSu5JBeqdDRjYyZXZ1PEEzEJAHn/4oVyk+DpdZWZHmB37Ngt6LWXqwb17uVHwcBJw4yzi9hIXPgnfyZfCITpXN0UuJIb0lutlLb+/44ffq8VW9YwOnUAAAAASUVORK5CYII=);
}
.todo-item .cb:checked:after{
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAZlBMVEUAAABDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEdDoEf///9DoEeJw4tHokvz+fNlsWjr9eu83b6MxY7B4MK327mm0qij0KV5u3xzuHbh8OFwtnJPplOpYahwAAAAEHRSTlMAVAb64NqsieRbA/OmlFwHqwA67gAAAKhJREFUGNN10esOgyAMBWCQmzB1QB143/b+LznpDEOTnZ9f0hROCaaiDWc30dCK5FAB6xzjvIKgBxnlhmAxYXDKICoYbc4ICmddtEVeju47al+ad++6IhrCyR5P6IjcztbbTRK+XMwunLDpYnZi5DZ5XxqiWLzzhaXxtAg1W1qkIST9WYAOH79rNjvU9+ObPlt0NBfSnwshpi2ra82/kjGVlpwxLvX3HB9v7hVTYan26QAAAABJRU5ErkJggg==);
}
.todo-item .cb:checked + label{
  color:#999;
  text-decoration: line-through;
}
</style>
