<script setup lang="ts">
import { ref } from 'vue'
import { iconUrl as iconUrlList } from '@/utils/logo'
import router from '@/router'

defineOptions({
  name: 'NavComponent',
})

const collapsed = ref(false)
const iconUrl = ref(iconUrlList.with_text)

const changeCollapsed = () => {
  collapsed.value = !collapsed.value
  iconUrl.value = collapsed.value
    ? iconUrlList.only_logo
    : iconUrlList.with_text
}

const changeHandler = (active: string) => {
  if (router.currentRoute.value.name != active) {
    router.push({ name: active })
  }
}
</script>

<template>
  <div class="nav">
    <t-menu
      theme="light"
      default-value="home"
      :collapsed="collapsed"
      @change="changeHandler"
    >
      <template #logo>
        <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
      </template>
      <t-menu-group title="主导航">
        <t-menu-item value="home">
          <template #icon>
            <t-icon name="app" />
          </template>
          仪表盘
        </t-menu-item>

        <t-menu-item value="file">
          <template #icon>
            <t-icon name="file" />
          </template>
          接收文件
        </t-menu-item>

        <t-menu-item value="chat">
          <template #icon>
            <t-icon name="chat" />
          </template>
          聊天室
        </t-menu-item>
      </t-menu-group>

      <template #operations>
        <t-button
          class="t-demo-collapse-btn"
          variant="text"
          shape="square"
          @click="changeCollapsed"
        >
          <template #icon><t-icon name="view-list" /></template>
        </t-button>
      </template>
    </t-menu>
  </div>
</template>

<style scoped lang="less"></style>
