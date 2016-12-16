<template>
  <div class="bug-list div-for-slide table-list">
    <table class="table table-striped table-bordered" style="text-align:left;">
      <thead>
            <tr>
              <th>Bug标识</th>
              <th>标题</th>
              <th>发起者</th>
              <th>处理者</th>
              <th>所属项目</th>
              <th>详情</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='bug in bugs'>
              <td>{{bug.id}}</td>
              <td>{{bug.title}}</td>
              <td>{{bug.author}}</td>
              <td>{{bug.responser}}</td>
              <td><router-link :to="'/bug/'+bug.id">Bugs</router-link></td>
              <td><router-link :to="'/bug/'+bug.id">详情</router-link></td>
            </tr>
            </tbody>
    </table>
    <button @click.prevent="$router.push({path:'/addbug'})" class="btn btn-info">新增bug</button>
  </div>
</template>

<script>

export default {
  name: 'buglist',
  data:function(){
      return {
        bugs:{

        }
      }
  },
  created:function(){
    //console.log('create');
    this.fetchData();
  },
  methods:{
    fetchData:function(){
      //console.log('fetch call');
      this.$http.get('/api/getBugs').then((response) => {
        // success callback
        //console.log('success');
        this.bugs = response.body.result.data;
        
      }, (response) => {
        console.log('error');
      });
    }
  },
  watch:{
    '$route':'fetchData'
  }
  /*beforeRouteEnter:function(to, from, next){

    getBugs((err, post) =>{

        if (err) {
          // display some global error message
          next(false)
        } else {
          next(vm => {
            vm.bugs = post
          })
        }
      })
    }*/
}
</script>
