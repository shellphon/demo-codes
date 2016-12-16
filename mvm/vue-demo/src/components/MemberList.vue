<template>
  <div class="member-list div-for-slide table-list">
    <table class="table table-striped table-bordered" style="text-align:left;">
      <thead>
            <tr>
              <th>编号</th>
              <th>姓名</th>
              <th>职位</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='item in members'>
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.job}}</td>
            </tr>
            </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'memberlist',
  data:function(){
      return {
        members:{

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
      this.$http.get('/api/getMembers').then((response) => {
        // success callback
        //console.log('success');
        this.members = response.body.result.data;
        
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
