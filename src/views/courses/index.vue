<template>
    <div class="courses-container">
        <el-row :gutter="20">
            <el-col :sm="12" :md="8" :lg="6" v-for="course,index in courses" :key="index">
                <el-card class="show-card" shadow="hover">
                    <div slot="header">
                        <el-row>
                            <el-col :xs="12" :sm="12" class="courses-title">
                                <template v-if="course.edit">
                                    <el-input size="mini" v-if="course.edit" v-model="course.name"></el-input>
                                </template>
                                <span v-else>{{course.name}}</span>
                            </el-col>
                            <el-col :xs="12" :sm="12" class="courses-operate">
                                <template v-if="course.edit">
                                    <el-button @click="cancelCourseEdit(index)" size="mini" type="warning" icon="el-icon-close" circle></el-button>
                                    <el-button @click="confirmCourseEdit(index)" size="mini" type="success" icon="el-icon-check" circle></el-button>
                                </template>
                                <template v-else>
                                    <el-button @click="addCategory" size="mini" type="success" icon="el-icon-plus" circle></el-button>
                                    <el-button @click="course.edit=!course.edit" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                                    <el-button @click="deleteCourse(index)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                                </template>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="courses-item" v-for="category,category_index in course.category_list" :key="category_index">
                        <el-row>
                            <el-col :xs="12" :sm="12" class="courses-item-title">
                                <span>{{category}}</span>
                            </el-col>
                            <el-col :xs="12" :sm="12" class="courses-item-operate">
                                <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :sm="12" :md="8" :lg="6">
                <el-card class="create-card" shadow="hover">
                    <el-button size="medium" type="success" icon="el-icon-plus">添加新学科</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "index",
        data:function(){
            return {
                courses:[
                    {
                        name:'前端开发',
                        originalName:'前端开发',
                        category_list:['html5','css3','javascript','jquery','bootstrap','vue','' +
                        'elementUI','iview','nuxt','webpack','react','antd','微信小程序','前端工具'],
                        edit:false,
                    },
                    {
                        name:'后端开发',
                        originalName:'后端开发',
                        category_list:['nodeJS','express','koa','egg','c&c++','docker'],
                        edit:false
                    }
                ]
            }
        },
        methods:{
            cancelCourseEdit:function(index){
                let currentCourse = this.courses[index];
                let oldValue = currentCourse.originalName;
                this.$set(this.courses[index],'name',oldValue);
                this.$set(this.courses[index],'edit',false);
                this.$message({
                    type:'warning',
                    message:'您已经放弃了修改'
                })
            },
            confirmCourseEdit:function(index){
                this.$set(this.courses[index],'edit',false);
                this.$set(this.courses[index],'originalName',this.courses[index].name);
                //预留请求的地方
                this.$message({
                    type:'success',
                    message:'您已经修改了学科名称'
                })
            },
            addCategory:function(){

            },
            deleteCourse:function(index){
                this.$confirm('删除该学科,该学科下的所有分类都将删除,是否继续?','提示',{
                    confirmButtonText:'确认',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    //预留请求的地方
                    this.courses.splice(index,1);
                    this.$message({
                        type:'success',
                        message:'已删除成功'
                    })
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'已取消删除'
                    })
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .courses{
        &-container {
            margin:30px;
        }
        &-title {
            height:28px;
            line-height:28px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        &-operate {
            text-align:right;
        }
        &-item {
            font-size:14px;
            color:#606266;
            padding:10px 0;
            &-title {
                height:28px;
                line-height:28px;
            }
            &-operate {
                text-align:right;
            }
        }
    }
    .create-card {
        height:330px;
        display:flex;
        align-items:center;
        justify-content: center;
    }
    .show-card {
        height:330px;
        margin-bottom:20px;
        overflow:scroll;
    }
</style>
