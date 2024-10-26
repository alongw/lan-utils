import fse from 'fs-extra'
import yaml from 'yaml'

const defaultConfig = {
    listen_port: 80
}

if (!fse.existsSync('./config.yaml')) {
    try {
        fse.writeFileSync('./config.yaml', yaml.stringify(defaultConfig))
    } catch (error) {
        console.error('Failed to create config.yaml', error)
    }
    console.log('Config file created. Please fill in the config.yaml file')
    process.exit(0)
}

const config = yaml.parse(
    fse.readFileSync('./config.yaml').toString()
) as typeof defaultConfig

export default config
