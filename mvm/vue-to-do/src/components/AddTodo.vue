<template>
  <div class="add-to-do">
    <h1><i class="glyphicon glyphicon-time"></i> To Do </h1>
    <form v-on:submit.prevent="onSubmit" role="form" class="form-horizontal" >
      <div class="form-group">
        <div class="col-sm-10">
          <input type="text" class="form-control" v-model="input" placeholder="输入事项~">
        </div>
          <button type="submit" class="btn btn-info col-sm-2">提交</button>
      </div>
    </form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'AddToDo',
  data: function(){
    return {
      input:''
    }
  },
  created:function(){
    
  },
  methods:{
    onSubmit:function(){
      const todo = {
        done : false,
        desc : '',
        time : (new Date())
      };
      if(this.input==''){
        alert('不能为空');
        return;
      }
      todo.desc = this.input;
      //this.input = '';
      this.$store.dispatch('newTodo', todo).then(()=>{
        this.input = '';
      }, ()=>{
        alert('出错');
      });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-to-do{
  width: 100%;
}
.add-to-do h1{
  /* text-align: center; */
  font-size: 32px;
  margin-bottom: 20px;
}
</style>
