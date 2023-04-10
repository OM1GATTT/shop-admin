<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
  <button class="btn m-4">按钮</button>
  <RouterView></RouterView>
</template>

<script setup>

</script>

<style scoped>
.btn {
  @apply bg-red-500 text-white px-10 py-2 rounded-full hover: (bg-red-700) focus:(ring-8 ring-red-400) transition-all duration-500
}
</style>