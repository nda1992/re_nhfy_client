<template>
  <!--就医指南图标组件-->
  <div class="cube-main">
    <div class="cube" @click="gotoTargePage(index, content)">
      <div>
        <svg-icon :icon-class="icon" style="width: 50px;height: 50px" />
      </div>
      <div style="margin-top:8px;">
        <span>{{ content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => {
        return ''
      }
    },
    content: {
      type: String,
      default: () => {
        return ''
      }
    },
    index: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  name: 'Cube',
  methods: {
    gotoTargePage(index, content) {
      const temp = { index: index, category: content }
      this.$emit('gotoTargePage', temp)
    }
  }
}
</script>

<style lang="scss" scoped>
.cube-main {
  .cube {
    width: 110px;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border: 1px solid #dfe4ed;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
