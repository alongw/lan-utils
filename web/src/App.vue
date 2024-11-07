<script setup lang="ts">
import NavComponent from '@/components/Nav.vue'

defineOptions({
  name: 'AppComponent',
})
</script>

<template>
  <div class="app">
    <div class="nav">
      <nav-component />
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="less">
.app {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>
