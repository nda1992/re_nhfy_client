<template>
    <!--视频播放-->
    <div>
        <el-dialog :visible.sync="openDialogvisible" :title='video.title' @close='closeDialog'>
            <div id='dialog-height'>
              <video :src="video.url" id='video' controls="controls"></video>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'VideoPlay',
    props: {
        video: {
            type: Object,
            default: () => {
                return {}
            }
        },
        openDialogvisible: {
            type: Boolean,
            default: () => {
                return false
            }
        }
    },
    data() {
        return {
            openDialogvisible_: this.openDialogvisible
        }
    },
    methods: {
        closeDialog() {
            const video = document.getElementById('video')
            video.pause()
        }
    }
}
</script>
<style scoped>
  #dialog-height {
    width: 640px;
    height: 360px;
  }
  #video {
      height:100%;
      width:100%;
  }
</style>