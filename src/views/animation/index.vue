<template>
  <!--I like these animations-->
  <div class="app-container">
    <div>
      <audio autoplay="autoplay" :src="url" v-show="true"></audio>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="You Like" name="first">
        <Cube />
      </el-tab-pane>
      <el-tab-pane label="I Like" name="second">
        <Random />
      </el-tab-pane>
      <el-tab-pane label="He Like" name="third">
        <Change />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Cube from './component/Cube'
import Random from './component/Random'
import Change from './component/Change'
import { BACKGROUND_MUSIC_DOWNLOAD } from '@/utils/urlConfig'
export default {
  name: 'Index',
  components: { Cube, Random, Change },
  data() {
    return {
      activeName: 'first',
      url: BACKGROUND_MUSIC_DOWNLOAD
    }
  },
  mounted() {
    this.autoplay()
  },
  methods: {
    autoplay() {
      const audio = document.getElementById('audio')
      if (audio.paused) {
        audio.play()
      }
    }
  }
}
</script>
