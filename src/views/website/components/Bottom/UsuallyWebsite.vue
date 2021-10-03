<template>
    <!--常用网站-->
    <div class="main">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ category }}</span>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: '常用网站'
        }
    }
}
</script>
<style lang="scss" scoped>
    .main {
        .clearfix {
            font-weight: bold;
            font-size: 17px;
            color: #3b7960;
        }
    }
</style>