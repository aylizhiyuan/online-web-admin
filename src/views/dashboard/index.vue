<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{role}}</span></div>
    <button @click="checkDelete">测试是否有删除的权限</button>
    <button @click="checkUpate">测试是否有更新的权限</button>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import request from '@/utils/request'
    export default {
        name: "index",
        computed:{
          ...mapGetters([
            'name',
            'roles'
          ])
        },
        methods:{
          checkDelete(){
            request({
              methods:'get',
              url:'/admin/delete'
            }).then(res=>{

            }).catch(err=>{
              this.$message({
                message:err,
                type:'error',
                duration: 5 * 1000
              })
            })
          },
          checkUpate(){
            request({
              methods:'get',
              url:'/admin/update'
            }).then(res=>{

            }).catch(err=>{
              this.$message({
                message:err,
                type:'error',
                duration: 5 * 1000
              })
            })
          }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin:30px;
    }
    &-text {
      font-size:30px;
      line-height:46px;
    }
  }
</style>
