import { cmdList } from './index'

import { handleSay } from './say'
import { handleRefresh } from './refresh'
import { handleClear } from './clear'

cmdList.set('say', handleSay)
cmdList.set('refresh', handleRefresh)
cmdList.set('reload', handleRefresh)
cmdList.set('clear', handleClear)
