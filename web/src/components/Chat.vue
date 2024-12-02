<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { sendMessage } from '@/ws/report'
import { useMessageStore } from '@/stores/message'
import { useStatusStore } from '@/stores/ststus'

import StatusComponent from '@/components/Status.vue'

defineOptions({
  name: 'ChatComponent',
})

const messageStore = useMessageStore()
const statusStore = useStatusStore()

const iptValue = ref('')
const isComposing = ref(false)
const isBtnDisabled = ref(false)
const countdown = ref(0)
let timer: ReturnType<typeof setTimeout> | null = null

const messageListRef = ref<HTMLElement | null>(null)

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

const scrollToBottom = (count?: number) => {
  count = count || 0
  nextTick(() => {
    if (!messageListRef.value || messageStore.messageList.length === 0) {
      if (count > 10) return
      return setTimeout(() => scrollToBottom(count + 1), 100)
    }
    messageListRef.value.scrollTo({
      top: messageListRef.value.scrollHeight,
      behavior: 'smooth',
    })
  })
}

watch(
  () => messageStore.messageList,
  () => {
    scrollToBottom()
  },
  { deep: true },
)

onMounted(() => {
  setTimeout(scrollToBottom, 100)
})
</script>

<template>
  <div class="chat-component">
    <div class="title">
      <h2>聊天室 &nbsp;</h2>
      <status-component />
    </div>
    <div class="content">
      <div class="message-list" ref="messageListRef">
        <t-space direction="vertical">
          <div
            v-for="item in messageStore.messageList"
            :key="item.time"
            class="msg-item"
          >
            <div v-if="item.sender.uuid === 'System'" class="system">
              <t-notification
                :title="item.sender.name"
                :content="item.text"
                :theme="item.msgType || 'info'"
              />
            </div>

            <div v-else class="normal-user">
              <t-notification
                :icon="false"
                :title="item.sender.name"
                :content="item.text"
              />
            </div>
          </div>
        </t-space>
      </div>
      <div class="input-group">
        <t-input
          v-model="iptValue"
          @compositionstart="isComposing = true"
          @compositionend="isComposing = false"
          @enter="!isComposing && handleSend()"
          :placeholder="
            !statusStore.pushMessagePermission
              ? '聊天功能不可用'
              : '请输入消息内容'
          "
          :disabled="!statusStore.pushMessagePermission"
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
  </div>
</template>

<style scoped lang="less">
.chat-component {
  padding: 15px;

  display: flex;
  flex-direction: column;

  height: 100%;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  .title {
    display: flex;
    font-size: 16px;
    margin: 10px 25px;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;

    .message-list {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
    }

    .input-group {
      padding: 15px 0;
      display: flex;
      align-items: center;
    }
  }

  ::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    padding: 0 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #aaaa !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 10px;
    transition: background 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #aaa !important;
  }
}
</style>
