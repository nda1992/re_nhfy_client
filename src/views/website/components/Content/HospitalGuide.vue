<template>
  <!--就医指南-->
  <div class="main">
    <Cube
      v-for="item in MenuList"
      :key="item.id"
      :icon="item.icon"
      :content="item.content.name"
      :index="item.content.index"
      @gotoTargePage="gotoTargePage"
    />
  </div>
</template>

<script>
import { getMenusByParent } from '@/api/website/website'
import Cube from './Cube'
export default {
  name: 'HospitalGuide',
  components: {
    Cube
  },
  data() {
    return {
      icons: [
        '门诊指南',
        '急诊指南',
        '住院指南',
        '挂号预约',
        '诊室分布',
        '医保服务',
        '交通指南',
        '泊车指南',
        '生活指南',
        '医院介绍',
        '患者飞鸿',
        '医院荣誉',
        '健康文章',
        '健康视频'
      ],
      content: [],
      MenuList: []
    }
  },
  mounted() {
    this.getMenusList()
  },
  methods: {
    getMenusList() {
      getMenusByParent().then(res => {
        const { items } = res
        let temp = {}
        // 取icons和items的交集
        this.content = items.filter(e => {
          if (this.icons.includes(e.name)) {
            return e
          }
        })
        for (let i in this.icons) {
          for (let j in this.content) {
            if (this.content[j].name === this.icons[i]) {
              temp = {
                id: parseInt(i) + 1,
                icon: this.icons[i],
                content: this.content[j]
              }
              break
            }
          }
          this.MenuList.push(temp)
          temp = {}
        }
        this.MenuList.push({
          id: 15,
          icon: '服务热线',
          content: { name: '服务热线', index: '/jyzn/fwrx' }
        })
      })
    },
    gotoTargePage(index) {
      this.$router.push({
        path: `content/${index.index}`,
        query: { category: index.category }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 370px;
  display: flex;
  justify-content: space-between;
  align-content: space-around;
  flex-wrap: wrap;
}
</style>
