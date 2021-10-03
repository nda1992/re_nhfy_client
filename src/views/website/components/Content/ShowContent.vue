<template>
    <!--content的公共组件：15个cube跳转的第一个页面均到达这里-->
    <div class="show-main">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>{{ title }}</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
        </div>
        </el-card>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type:String,
            default: () => {
                return ''
            }
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>