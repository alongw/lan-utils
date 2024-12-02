<script setup lang="ts">
import ChatComponent from '@/components/Chat.vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { onMounted } from 'vue'
import { useInfoStore } from '@/stores/info'
import { useStatusStore } from '@/stores/ststus'
import router from '@/router'

import { getPermission } from '@/utils/push'

defineOptions({
  name: 'ChatPage',
})

const infoStore = useInfoStore()
const statusStore = useStatusStore()

onMounted(() => {
  if (!infoStore.uuid || !infoStore.username) {
    MessagePlugin.error('基于保安理由，补充资料后才能进行该操作')
    setTimeout(() => {
      router.push('/info')
    }, 100)
  }

  getPermission()
})
</script>

<template>
  <div class="chat">
    <chat-component />
    <div v-if="!statusStore.pushMessagePermission" class="tips">
      <t-alert theme="error">
        <p>你必须将接收消息权限设置为允许才能继续使用聊天功能。</p>
        <p>在浏览器左上角选择允许，然后点击重试按钮。</p>

        <template #title> 需要执行的操作 </template>

        <template #operation>
          <span @click="getPermission(true)">重试</span>
        </template>
      </t-alert>
    </div>
  </div>
</template>

<style scoped lang="less">
.chat {
  padding: 20px;
  width: 100%;

  height: 100%;

  .tips {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
