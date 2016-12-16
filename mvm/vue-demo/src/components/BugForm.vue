<template>
<div class="business-form">
  <h2 v-if='bug.id!=0'>修改BUG表单</h2>
  <h2 v-else='bug.id!=0'>新增BUG表单</h2>
  <form class="form-horizontal" role="form" v-on:submit.prevent="onSubmit">
    <input type="hidden" name="id" id="form_id" v-model="bug.id">
    <div class="form-group">
      <label for="bug_title" class="col-sm-2 control-label">标题</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="bug_title" placeholder="缺陷标题" v-model="bug.title">
      </div>
    </div>
    <div class="form-group">
      <label for="bug_desc" class="col-sm-2 control-label">详细描述</label>
      <div class="col-sm-10">
        <textarea class="form-control" id="bug_desc" placeholder="详细描述" rows="3" v-model="bug.desc"></textarea>
      </div>
    </div>
     <div class="form-group">
      <label class="col-sm-2 control-label">发起者</label>
       <div class="col-sm-10">
          <input type="text" class="form-control" readonly v-model="bug.author">
       </div>
     </div>
    <div class="form-group">
     <label class="col-sm-2 control-label">Bug等级</label>
     <div class="col-sm-10">
        <select class="form-control" v-model="bug.level">
          <option value="1">可能是特性</option>
          <option value="2">兴许算bug</option>
          <option value="3">最好改一下</option>
          <option value="4">作死啊这是</option>
          <option value="5">明天别来了</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">指派给</label>
       <div class="col-sm-10">
        <select class="form-control" v-model="bug.responser">
          <option v-for='member in members' :value="member.name">{{member.name}}</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-success">提交</button>
        <button @click.prevent="$router.go(-1)" class="btn btn-default">返回</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>

export default {
  name: 'bugform',
  data:function(){
      return {
        bug:{
          id:0,
          author:'dont'
        },
        members:[]
      }
  },
  created:function(){
    this.fetchMembers();
  },
  methods:{
    fetchMembers: function(){
       var localStorage = window.localStorage,
          lsMembers = localStorage.getItem('ls-members'),
          now = new Date(),
          limit = 4*60*1000,
          tmp;
          if(lsMembers){
            lsMembers = JSON.parse(lsMembers);
            if(now-lsMembers.time<=limit){
                this.members = lsMembers.data;
                this.fetchData();
                return;
            }
          }
          this.$http.get('/api/getMembers').then((response) => {
              // success callback
              //console.log('success');
              /*this.hasMembers = true;*/
              var data = response.body.result.data
              this.members = data;
              this.fetchData();

              lsMembers = {
                time: (new Date()).getTime(),
                data: data
              };
              localStorage.setItem('ls-members', JSON.stringify(lsMembers));

            }, (response) => {
              console.log('error');
            });
    },
    fetchData:function(){
      //console.log('fetch call');
      if(this.$route.params.id){
        this.$http.get('/api/bug/'+this.$route.params.id).then((response) => {
          // success callback
          //console.log('success');
          this.bug = response.body.result;
          
        }, (response) => {
          console.log('error');
        });
      }
    },
    onSubmit:function(){
      if(this.bug.id!==0){
      }
      this.$http.options.emulateJSON = true;
        this.$http.post('/api/postbug',this.bug).then((res)=>{
          alert('save success');
          this.$router.push({path:'/getBugs'});
        },(res)=>{
          console.log('error');
        })
    }
  },
  watch:{
    '$route':'fetchData'
  }
}
</script>

<style>
  .business-form{
    width: 70%;
    padding-top: 20px;
  }
  .business-form h2{
    text-align: center;
  }
  .business-form form{
    padding-top: 20px;
  }
</style>
