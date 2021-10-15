<template>
  <!-- 门急诊人次：可视化组件-->
  <div :id="main" :style="{width: width,height: height}"></div>
</template>

<script>
export default {
  name: 'Visualize',
  props: {
    main: {
      type: String,
      default: () => {
        return 'main'
      }
    },
    width: {
      type: String,
      default: () => {
        return '400px'
      }
    },
    height: {
      type: String,
      default: () => {
        return '300px'
      }
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      option: this.options
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const mychart = this.$echarts.init(document.getElementById('main'))
      mychart.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>
