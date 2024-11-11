import { reactive } from 'vue'
import router from '@/router'

import type { FormProps } from 'tdesign-vue-next'

import { updateUserInfo } from '@/ws/report'

export const useInfoHook = () => {
  const FORM_RULES = {
    name: [
      {
        required: true,
        message: '昵称必填',
      },
      {
        min: 3,
        max: 10,
        message: '昵称长度需控制在 3 到 10 个字符',
      },
    ],
  }

  const formData: FormProps['data'] = reactive({
    name: '',
  })

  const handleSubmit: FormProps['onSubmit'] = ({ validateResult }) => {
    if (validateResult !== true) return
    updateUserInfo({ name: formData.name })
    router.push('/')
  }

  return {
    FORM_RULES,
    formData,

    handleSubmit,
  }
}
