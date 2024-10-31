<script setup lang="ts">
import { getStatusLight } from '@/utils/statusLight'

defineOptions({
  name: 'ChatComponent',
})
</script>

<template>
  <div class="chat-component">
    <t-card hover-shadow>
      <template #title>
        <div class="title">
          <h2>聊天室 &nbsp;</h2>
          <div
            class="status-light"
            :style="{
              backgroundColor: getStatusLight(),
            }"
          ></div>
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

      11223344
    </t-card>
  </div>
</template>

<style scoped lang="less">
.title {
  display: flex;
  align-items: center;

  .status-light {
    width: 10px;
    height: 10px;

    background-color: gray;
    border-radius: 50%;
  }
}
</style>
