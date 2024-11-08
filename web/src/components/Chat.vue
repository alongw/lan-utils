<script setup lang="ts">
import { ref } from 'vue'

import StatusComponent from '@/components/Status.vue'

defineOptions({
  name: 'ChatComponent',
})

const iptValue = ref('')
const isComposing = ref(false)

const handleSend = () => {
  if (!iptValue.value) return
  console.log('发送消息', iptValue.value)
}
</script>

<template>
  <div class="chat-component">
    <t-card hover-shadow style="height: 100%">
      <template #title>
        <div class="title">
          <h2>聊天室 &nbsp;</h2>
          <status-component />
        </div>
      </template>
      <template #actions>
        <t-tooltip content="发起新聊天">
          <t-button variant="text" shape="square">
            <t-icon name="add" />
          </t-button>
        </t-tooltip>
        <t-tooltip content="清空历史记录">
          <t-button variant="text" shape="square">
            <t-icon name="delete" />
          </t-button>
        </t-tooltip>
      </template>
      <template #footer>
        <div class="input">
          <t-input
            v-model="iptValue"
            @compositionstart="isComposing = true"
            @compositionend="isComposing = false"
            @enter="!isComposing && handleSend()"
            placeholder="请输入消息内容"
          />
          <t-button @click="handleSend()" theme="default" variant="outline">
            发送
          </t-button>
        </div>
      </template>

      <div class="msg">
        <t-notification
          :icon="false"
          title="127.0.0.1"
          content="这是一条消息通知"
        />
      </div>
    </t-card>
  </div>
</template>

<style scoped lang="less">
.chat-component {
  height: 100%;

  .title {
    display: flex;
    align-items: center;
  }

  .input {
    display: flex;
  }
}
</style>
