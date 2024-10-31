import fse from 'fs-extra'

await fse.ensureDir('./share')
await fse.ensureDir('./public')

import('./modules/ws')
import('./modules/file')
