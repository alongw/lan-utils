<script setup lang="ts">
import ChatComponent from '@/components/Chat.vue'

defineOptions({
  name: 'ChatPage',
})
</script>

<template>
  <div class="chat">
    <chat-component />
  </div>
</template>

<style scoped lang="less">
.chat {
  padding: 20px;
  width: 100%;
}
</style>
