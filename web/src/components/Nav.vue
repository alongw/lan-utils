<script setup lang="ts">
import { watch, ref } from 'vue'
import { iconUrl as iconUrlList } from '@/utils/logo'
import router from '@/router'

defineOptions({
  name: 'NavComponent',
})

const collapsed = ref(false)
const iconUrl = ref(iconUrlList.with_text)
const currentMenu = ref<string | number>()

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

watch(router.currentRoute, e => {
  currentMenu.value = e.name?.toString() || ''
})
</script>

<template>
  <div class="nav">
    <t-menu
      theme="light"
      :collapsed="collapsed"
      @change="changeHandler"
      v-model:value="currentMenu"
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

      <t-menu-group title="管理">
        <t-menu-item value="login">
          <template #icon>
            <t-icon name="login" />
          </template>
          登录
        </t-menu-item>

        <t-submenu value="1" title="管理员功能">
          <template #icon>
            <t-icon name="code" />
          </template>
          <t-menu-item value="1-1" disabled>
            <span>菜单二</span>
          </t-menu-item>
        </t-submenu>
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

<style scoped lang="less">
.nav {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
}
</style>
