import fse from 'fs-extra'
import { consoleService } from '@/modules/console/index'

await fse.ensureDir('./share')
await fse.ensureDir('./public')
await fse.ensureDir('./data')

import('./modules/ws')
consoleService()
