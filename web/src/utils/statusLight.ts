import { useStatusStore } from '@/stores/ststus'

const statusStore = useStatusStore()

export enum StatusLight {
  ok = '#88cb7f',
  error = '#f56c6c',
  warning = '#f5a623',
  unknown = '#9b9b9b',
}

export const getStatusLight = () => {
  if (statusStore.wsConnectStatus === false) return StatusLight.error
  if (statusStore.wsConnectStatus === true) return StatusLight.ok
  return StatusLight.unknown
}
