<script setup lang="ts">
import { ref } from 'vue'
import { EditIcon, DownloadIcon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import type { ListItemMetaProps, PaginationProps } from 'tdesign-vue-next'
defineOptions({
  name: 'FilePage',
})

const avatarUrl: ListItemMetaProps['image'] =
  'https://tdesign.gtimg.com/site/avatar.jpg'

const current = ref(1)
const pageSize = ref(5)
const onPageSizeChange: PaginationProps['onPageSizeChange'] = size => {
  console.log('page-size:', size)
  MessagePlugin.success(`pageSize变化为${size}`)
}
const onCurrentChange: PaginationProps['onCurrentChange'] = (
  index,
  pageInfo,
) => {
  MessagePlugin.success(`转到第${index}页`)
  console.log(pageInfo)
}
const onChange: PaginationProps['onChange'] = pageInfo => {
  console.log(pageInfo)
}
</script>

<template>
  <div class="file">
    <div class="nav">
      <h1>接收文件</h1>
    </div>

    <div class="file-list">
      <t-list :split="true">
        <t-list-item>
          <t-list-item-meta
            :image="avatarUrl"
            title="列表主内容"
            description="列表内容列表内容"
          />
          <template #action>
            <t-button variant="text" shape="square">
              <edit-icon />
            </t-button>
            <t-button variant="text" shape="square">
              <download-icon />
            </t-button>
          </template>
        </t-list-item>
        <t-list-item>
          <t-list-item-meta
            :image="avatarUrl"
            title="列表主内容"
            description="列表内容列表内容"
          />
          <template #action>
            <t-button variant="text" shape="square">
              <edit-icon />
            </t-button>
            <t-button variant="text" shape="square">
              <download-icon />
            </t-button>
          </template>
        </t-list-item>
      </t-list>

      <div class="pagination">
        <t-pagination
          v-model="current"
          v-model:pageSize="pageSize"
          :total="100"
          @change="onChange"
          @page-size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.file {
  width: 100%;
  height: 100%;

  .nav {
    padding: 20px;
  }

  .file-list {
    padding: 20px;
    margin: 0 auto;
    margin-top: 40px;

    .pagination {
      margin-top: 25px;
    }
  }
}
</style>
