import * as core from '@actions/core'
import {check_directory, check_urls} from './check'
import {set_up_configuration} from './config'
import {clean_artifacts} from './tools'

export async function main(): Promise<void> {
    try {
        const repositories: string = core.getInput('repositories')
        await set_up_configuration()

        if (repositories === '') {
            await check_directory()
        } else {
            await check_urls(repositories)
        }
        await clean_artifacts(['.tortellini/out'])
    } catch (error) {
        core.setFailed(error.message)
    }
}
