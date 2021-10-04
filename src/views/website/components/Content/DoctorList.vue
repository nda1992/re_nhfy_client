<template>
    <!--显示所有医生的列表-->
    <div class='main'>
      <div class='card'>
        <showDoctorCard
        v-for='item in doctorList'
        :key='item.id'
        :id='item.id'
        :avatar='item.avatar'
        :username='item.username'
        :deptName='item.deptName'
        :jobTitle='item.jobTitle'
        @openDialog='openDialog'
        @closeDialog='closeDialog' />
      </div>

      <div class='page'>
        <pagination
        :pageSizes='[12]'
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getAllExpertList" />
      </div>

    </div>
</template>
<script>
import showDoctorCard from './showDoctorCard'
import Pagination from '@/components/Pagination'
export default {
  name: 'DoctorList',
  components: {
    showDoctorCard,
    Pagination
  },
  props: {
    doctorList: {
      type: Array,
      default: () => {
        return []
      }
    },
    listQuery: {
      type: Object,
      default: () => {
        return {
          limit: 12,
          page: 1
        }
      }
    },
    total: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  
  methods: {
    getAllExpertList() {
      this.$emit('getAllExpertList')
    },
    openDialog(id) {
      this.$emit('openDialog', id)
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
<style lang="scss" scoped>
  .main {
    .card {
      height: 450px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .page {
      .pagination-container {
        padding: 0;
      }
    }
  }
</style>