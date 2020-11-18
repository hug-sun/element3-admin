<template>
  <div style="padding: 30px;">
    <router-view v-slot="{ Component }">
      <el-alert :closable="false" title="menu 1-2" type="success">
        <component :is="Component" />
      </el-alert>
    </router-view>
  </div>
</template>
