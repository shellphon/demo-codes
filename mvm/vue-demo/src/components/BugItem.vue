<template>
  <div class="bug-detail div-for-slide item-detail">
      <router-link to="/bugs">返回</router-link>
      <h2>Bug详情- {{$route.params.id}}</h2>
      <p>标题概要：{{post.title}}</p>
      <p>详情：{{post.desc}}</p>
      <p>严重程度：{{levels[post.level]}}({{post.level}})</p>
      <p>发起者：{{post.author}}</p>
      <p>负责人：{{post.responser}}</p>
<!--
      <router-link :to="'/editbug/'+ $route.params.id">编辑</router-link>
-->
      <button @click.prevent="$router.push({path:'/editbug/'+$route.params.id})" class="btn btn-warning">编辑</button>
  </div>
</template>

<script>

export default {
  name: 'bugitem',
  data:function(){
      return {
        post:{

        },
        levels:{
          "1":"可能是特性",
          "2":"兴许算bug",
          "3":"最好改一下",
          "4":"作死啊这是",
          "5":"明天别来了"
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
      this.$http.get('/api/bug/'+this.$route.params.id).then((response) => {
        // success callback
        //console.log('success');
        this.post = response.body.result;
        
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
