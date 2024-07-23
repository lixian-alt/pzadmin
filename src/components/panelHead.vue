<template>
  <div class="panel-heading">
    <div class="panel-lead">
      <div class="title">管理员管理</div>
      <p class="description">一个管理员可以有多个角色组,左侧的菜单根据管理员所拥有的权限进行生成</p>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="less" scoped>
.panel-heading {
  padding: 15px;
  background: #e8edf0;
  border-color: #e8edf0;
  position: relative;
  .panel-lead {
    font-size: 14px;
    .title {
      font-weight: bold;
      font-style: normal;
    }
    .description {
      margin-top: 5px;
    }
  }
}
</style>