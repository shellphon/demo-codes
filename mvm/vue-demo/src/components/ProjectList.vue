<template>
  <div class="member-list div-for-slide table-list">
    <table class="table table-striped table-bordered" style="text-align:left;">
      <thead>
            <tr>
              <th>编号</th>
              <th>项目名称</th>
              <th>项目简介</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='item in projects'>
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.desc}}</td>
            </tr>
            </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'projectlist',
  data:function(){
      return {
        projects:{

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
      this.$http.get('/api/getProjects').then((response) => {
        // success callback
        //console.log('success');
        this.projects = response.body.result.data;
        
      }, (response) => {
        console.log('error');
      });
    }
  },
  watch:{
    '$route':'fetchData'
  }
  
}
</script>
