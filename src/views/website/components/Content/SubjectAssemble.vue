<template>
    <!--学科荟萃-->
    <div class="main">
      <showSubjectAssemble
      :total='total'
      :newsList='list'
      :listQuery='listQuery'
      @getSubjectAssembleList='getSubjectAssembleList'
      @gotoDetail='gotoDetail' />
    </div>
</template>

<script>
import { getSubjectAssembleList } from '@/api/website/website'
import showSubjectAssemble from './showSubjectAssemble'
export default {
  name: 'SubjectAssemble',
  components: {
    showSubjectAssemble
  },
  data() {
    return {
      total: 0,
      listQuery: {
        limit: 5,
        page: 1
      },
      list: null
    }
  },
  mounted() {
    this.getSubjectAssembleList()
  },
  methods: {
    getSubjectAssembleList() {
      const temp = Object.assign({}, this.listQuery, { category: '学科荟萃' })
      getSubjectAssembleList(temp).then(res => {
        const { items, total } = res
        this.list = items
        this.total = total
      })
    },
    gotoDetail(id) {
      this.$router.push({ path: `getnews/${id}` })
    }
  }
}
</script>
