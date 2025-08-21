<template>
  <div>
    <h1>Admin</h1>
  </div>
</template>

<script setup>
import { authAdmin } from '../../../api'
import { reactive, onMounted } from 'vue';

const paginationData = reactive({
  pageNum: 1,
  pageSize: 10
})

onMounted(() => {
  authAdmin(paginationData).then(({ data }) => {
    console.log(data, 'authAdmin')
  })
})
</script>
<style lang="less" scoped></style>
