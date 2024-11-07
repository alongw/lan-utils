<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFileListStore } from '@/stores/fileList'
import { getIconUrl, getDownloadUrl } from '@/utils/file'

import type { PaginationProps } from 'tdesign-vue-next'

defineOptions({
  name: 'FilePage',
})

const fileListStore = useFileListStore()

const current = ref(1)
const pageSize = ref(5)

const total = computed(() => fileListStore.fileList.length)

watch([() => fileListStore.fileList, pageSize], () => {
  const maxPage = Math.max(1, Math.ceil(total.value / pageSize.value))
  if (current.value > maxPage) {
    current.value = maxPage
  }
})

const paginatedList = computed(() => {
  const start = (current.value - 1) * pageSize.value
  const end = start + pageSize.value
  return fileListStore.fileList.slice(start, end)
})

const onPageSizeChange: PaginationProps['onPageSizeChange'] = size => {
  pageSize.value = size
}

const onCurrentChange: PaginationProps['onCurrentChange'] = index => {
  current.value = index
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
        <t-list-item v-for="item in paginatedList" :key="item.fullName">
          <t-list-item-meta
            :title="item.name"
            :description="item.ext + ' 文件'"
          >
            <template #image>
              <t-image
                :src="getIconUrl(item.ext)"
                :style="{
                  width: '80%',
                  height: '80%',
                  display: 'block',
                  margin: 'auto',
                  marginTop: '5px',
                  backgroundColor: '#f3f3f3',
                }"
              />
            </template>
          </t-list-item-meta>

          <template #action>
            <t-link
              theme="primary"
              hover="color"
              style="margin-left: 16px"
              :href="getDownloadUrl(item.fullName)"
              target="_blank"
              name="download"
            >
              下载
            </t-link>
          </template>
        </t-list-item>
      </t-list>

      <div class="pagination">
        <t-pagination
          v-model="current"
          v-model:page-size="pageSize"
          :total="total"
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
