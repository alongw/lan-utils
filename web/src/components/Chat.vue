<script setup lang="ts">
import { ref } from 'vue'
import { sendMessage } from '@/ws/report'
import { useMessageStore } from '@/stores/message'

import StatusComponent from '@/components/Status.vue'

defineOptions({
  name: 'ChatComponent',
})

const messageStore = useMessageStore()

const iptValue = ref('')
const isComposing = ref(false)
const isBtnDisabled = ref(false)
const countdown = ref(0)
let timer: ReturnType<typeof setTimeout> | null = null

const freezeIpt = () => {
  if (timer) clearTimeout(timer)
  isBtnDisabled.value = true
  countdown.value = 3

  const tick = () => {
    countdown.value--
    if (countdown.value > 0) {
      timer = setTimeout(tick, 1000)
    } else {
      isBtnDisabled.value = false
      timer = null
    }
  }

  timer = setTimeout(tick, 1000)
}

const handleSend = () => {
  if (!iptValue.value || isBtnDisabled.value) return
  sendMessage(iptValue.value)
  iptValue.value = ''
  freezeIpt()
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

      <div class="card-content">
        <div class="msg">
          <t-space direction="vertical">
            <t-notification
              v-for="item in messageStore.messageList"
              :key="item.time"
              :icon="false"
              :title="item.sender.name"
              :content="item.text"
            />
          </t-space>
        </div>
        <div class="input">
          <t-input
            v-model="iptValue"
            @compositionstart="isComposing = true"
            @compositionend="isComposing = false"
            @enter="!isComposing && handleSend()"
            placeholder="请输入消息内容"
          />
          <t-button
            @click="handleSend()"
            theme="default"
            variant="outline"
            :disabled="isBtnDisabled"
          >
            {{ isBtnDisabled ? `发送 (${countdown})` : '发送' }}
          </t-button>
        </div>
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

  .card-content {
    max-height: 70vh;
    display: flex;
    flex-direction: column;

    .msg {
      flex: 1;
      overflow-y: auto;
      padding-bottom: 10px;
      box-shadow: inset 0 10px 10px -10px rgba(0, 0, 0, 0.1);
    }

    .input {
      display: flex;
      align-items: center;
    }
  }
}
</style>
