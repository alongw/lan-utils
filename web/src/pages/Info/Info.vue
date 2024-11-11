<script setup lang="ts">
import { useInfoHook } from './useInfoHook'

defineOptions({
  name: 'InfoPage',
})

const { FORM_RULES, formData, handleSubmit } = useInfoHook()
</script>

<template>
  <div class="info">
    <div class="title">
      <h1>完善信息</h1>
    </div>

    <div class="form">
      <t-form :rules="FORM_RULES" :data="formData" @submit="handleSubmit">
        <t-form-item label="昵称" name="name">
          <t-input v-model="formData.name" placeholder="请输入昵称" />
        </t-form-item>

        <t-form-item>
          <t-space size="small">
            <t-button theme="primary" type="submit"> 提交 </t-button>
          </t-space>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.info {
  margin: 50px auto;
  max-width: 800px;

  .title {
    margin-bottom: 20px;
  }
}
</style>
