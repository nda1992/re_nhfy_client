<template>
    <!--视频中心-->
    <div class="main">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ category }}</span>
            </div>
            <el-carousel :interval="5000" height="230px">
            <el-carousel-item v-for="item in videoList" :key="item.id">
                <img :src="item.cover" @click="openDialog(item)" />
            </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        videoList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            category: '视频中心'
        }
    },
    methods: {
        openDialog(item) {
            this.$emit('openDialog', item)
        }
    }
}
</script>
<style scoped>
    .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<style lang="scss" scoped>
    .main {
        position: relative;
        .box-card {
            .clearfix {
            font-weight: bold;
            font-size: 17px;
            color: #3b7960;
            }
            .small {
                width: 100%;
                height: 100%;
                font-size: 13px;
                z-index: 99999;
            }
            img {
            width: 100%;
            height: 100%;
            &:hover {
                cursor: pointer;
            }
            }
        }
    }
</style>