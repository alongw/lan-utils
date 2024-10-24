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
    <router-view />
  </div>
</template>

<style scoped lang="less">
.app {
  display: flex;
}
</style>
