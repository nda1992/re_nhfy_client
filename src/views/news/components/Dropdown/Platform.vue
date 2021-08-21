<template>
  <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click">
    <el-button plain>
      发布平台({{ platforms.length }})
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-border">
      <el-checkbox-group v-model="platforms" style="padding: 5px 15px;">
        <el-checkbox v-for="item in platformsOptions" :key="item.key" :label="item.key">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      platformsOptions: [
        { key: '院内网站', name: '院内网站' },
        { key: '院外网站', name: '院外网站' }
      ]
    }
  },
  computed: {
    platforms: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
