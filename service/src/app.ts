import fse from 'fs-extra'

await fse.ensureDir('./share')
await fse.ensureDir('./public')
await fse.ensureDir('./data')

import('./modules/ws')
