<script setup lang="ts">
import ChatComponent from '@/components/Chat.vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { onMounted } from 'vue'
import { useInfoStore } from '@/stores/info'
import router from '@/router'

defineOptions({
  name: 'ChatPage',
})

const infoStore = useInfoStore()

onMounted(() => {
  if (!infoStore.uuid || !infoStore.username) {
    MessagePlugin.error('基于保安理由，补充资料后才能进行该操作')
    setTimeout(() => {
      router.push('/info')
    }, 100)
  }
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

  height: 100%;
}
</style>
