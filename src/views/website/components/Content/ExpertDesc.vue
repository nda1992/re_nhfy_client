<template>
  <!--专家介绍-->
  <div>
    <DoctorList
    :listQuery='listQuery'
    :total='total'
    :doctorList='list'
    @getAllExpertList='getAllExpertList'
    @openDialog='openDialog'
    @closeDialog='closeDialog' />

    <!--医生详细信息-->
    <doctorDetail
    :openVisible='visible'
    :doctorItem='doctorItem' />
  </div>
</template>

<script>
import doctorDetail from './doctorDetail'
import DoctorList from './DoctorList'
import { getAllExpertList, getDoctorDetailById } from '@/api/website/website'
export default {
  name: 'ExpertDesc',
  components: {
    DoctorList,
    doctorDetail
  },
  mounted() {
    this.getAllExpertList()
  },
  data() {
    return {
      listQuery: {
        limit: 12,
        page: 1
      },
      total: 0,
      list: null,
      visible: false,
      doctorItem: {}
    }
  },
  methods: {
    getAllExpertList() {
      const temp = Object.assign({}, this.listQuery, { grade: '专家' })
      getAllExpertList(temp).then(res => {
        const { items, total } = res
        this.list = items
        this.total = total
      })
    },
    getDoctorDetailById(id) {
      getDoctorDetailById({ id: id }).then(res => {
        const { item } = res
        this.doctorItem = item
      })
    },
    openDialog(id) {
      this.visible = true
      this.getDoctorDetailById(id)
    },
    closeDialog() {
      this.visible = false
    }
  }
}
</script>