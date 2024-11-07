<script setup lang="ts">
import { getStatusLight } from '@/utils/statusLight'
import { useStatusStore } from '@/stores/ststus'

defineOptions({
  name: 'StatusComponent',
})

const statusStore = useStatusStore()
</script>

<template>
  <div class="status">
    <div
      class="status-light"
      :style="{
        backgroundColor: getStatusLight(),
      }"
    />
    <span> {{ statusStore.wsClientCount || '1' }} </span>
  </div>
</template>

<style scoped lang="less">
.status {
  display: flex;
  align-items: center;
  //   vertical-align: middle;

  .status-light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  span {
    margin-left: 8px;
  }
}
</style>
