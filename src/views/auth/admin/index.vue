<template>

  <panel-head :route="route" />

  <div>
    <h1>Admin</h1>
  </div>
  <el-table :data="tableData.list" style="width: 100%">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="昵称" />

    <el-table-column prop="permissions_id" label="所属组别">
      <template #default="scope">
        {{ permissionName(scope.row.permissions_id) }}
      </template>
    </el-table-column>

    <el-table-column prop="mobile" label="手机号" />

    <el-table-column prop="active" label="状态">
      <template #default="scope">
        <el-tag :type="scope.row.active ? 'success' : 'danger'">{{ scope.row.active ? '正常' : '失效'
        }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="created_time" label="创建时间">
      <template #default="scope">
        <div class="flex-box">
          <el-icon>
            <Clock />
          </el-icon>
          <span style="margin-left: 10px;">{{ scope.row.created_item }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="open(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="pagination-info">
    <el-pagination v-model:current-page="paginationData.pageNum" :page-size="paginationData.pageSize"
      :background="false" layout="total, prev, pager, next" :total="tableData.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" size="small" />
  </div>

  <el-dialog v-model="dialogFormVisible" :before-close="beforeClose" title="添加权限" width="500px">
    <el-form ref="formRef" label-width="100px" label-position="left" :model="form" :rules="rules">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" disabled />
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="菜单权限" prop="permissions_id">
        <el-select v-model="form.permissions_id" placeholder="请选择菜单权限" style="width: 240px;">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm(formRef)">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { el } from 'element-plus/es/locales.mjs';
import { authAdmin, menuSelectList, updateUser } from '../../../api'
import { reactive, onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';

const route = useRoute();

const paginationData = reactive({
  pageNum: 1,
  pageSize: 10
})

//列表数据
const tableData = reactive({
  list: [],
  total: 0
})

//请求列表数据
const getListData = () => {
  authAdmin(paginationData).then(({ data }) => {
    console.log(data, 'authAdmin')
    const { list, total } = data.data
    list.forEach(item => {
      item.created_item = dayjs(item.created_time).format('YYYY-MM-DD ')
    })
    tableData.list = list
    tableData.total = total
  })
}

onMounted(() => {
  getListData()
  menuSelectList().then(({ data }) => {
    options.value = data.data
  })
})

const options = ref([])

const handleSizeChange = (val) => {
  paginationData.pageSize = val
  getListData()
}
const handleCurrentChange = (val) => {
  paginationData.pageNum = val
  getListData()
}

//弹窗
const dialogFormVisible = ref(false)
const beforeClose = () => {
  dialogFormVisible.value = false
}

const rules = reactive({
  name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  permissions_id: [{ required: true, message: '请选择菜单权限', trigger: 'change' }]
})


const formRef = ref()
//编辑表单
const form = reactive({
  name: '',
  permissions_id: '',
})

//表单提交
const confirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const { name, permissions_id } = form
      updateUser({ name, permissions_id }).then(({ data }) => {
        if (data.code === 10000) {
          dialogFormVisible.value = false
          getListData()
        }
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}


//根据权限id匹配权限名称
const permissionName = (id) => {
  const data = options.value.find(el => el.id === id);
  return data ? data.name : '超级管理员';
}

const open = (rowData) => {
  Object.assign(form, { mobile: rowData.mobile, name: rowData.name, permissions_id: rowData.permissions_id })
  dialogFormVisible.value = true
}
</script>
<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
}
</style>
