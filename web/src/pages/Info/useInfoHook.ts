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
        max: 13,
        message:
          '昵称长度需控制在 3 到 13 个字符，仅可包含中文、英文、数字和下划线',
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
