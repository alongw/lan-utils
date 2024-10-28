<script setup lang="ts">
import '@/utils/ws'

defineOptions({
  name: 'ChatComponent',
})
</script>

<template>
  <div class="chat-component">
    <t-card title="聊天室" hover-shadow>
      11223344
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
    </t-card>
  </div>
</template>

<style scoped lang="less"></style>
