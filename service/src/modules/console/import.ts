import { cmdList } from './index'

import { handleSay } from './say'
import { handleRefresh } from './refresh'

cmdList.set('say', handleSay)
cmdList.set('refresh', handleRefresh)
cmdList.set('reload', handleRefresh)
