import {rmdir, mkdtemp, stat} from 'fs/promises'
import {tmpdir} from 'os'
import {join} from 'path'
import {set_up_configuration} from '../src/config'

describe('set_up_configuration', () => {
    describe('with all URLs', () => {
        let config_dir: string
        beforeEach(async () => {
            process.env['INPUT_CURATIONS'] =
                'https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/curations.yml'
            process.env['INPUT_RULES'] =
                'https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/rules.kts'
            process.env['INPUT_CLASSIFICATIONS'] =
                'https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/license-classifications.yml'

            config_dir = await mkdtemp(join(tmpdir(), 'tortellini'))

            await set_up_configuration(config_dir)
        })

        afterEach(async () => {
            await rmdir(config_dir, {recursive: true})
        })

        it('should fill .tortellini/config/curations.yml', async () => {
            const curations = await stat(join(config_dir, 'curations.yml'))
            expect(curations.size > 0).toBeTruthy()
        })

        it('should fill .tortellini/config/license-classifications.yml', async () => {
            const curations = await stat(
                join(config_dir, 'license-classifications.yml')
            )
            expect(curations.size > 0).toBeTruthy()
        })

        it('should fill .tortellini/config/rules.kts', async () => {
            const curations = await stat(join(config_dir, 'rules.kts'))
            expect(curations.size > 0).toBeTruthy()
        })
    })
})
