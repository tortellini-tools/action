import * as core from '@actions/core'
import {check_directory, check_urls} from './check'
import {set_up_configuration} from './config'

export async function main(): Promise<void> {
    try {
        const repositories: string = core.getInput('repositories')
        await set_up_configuration()

        if (repositories === '') {
            await check_directory()
        } else {
            await check_urls(repositories)
        }
    } catch (error) {
        core.setFailed(error.message)
    }
}
