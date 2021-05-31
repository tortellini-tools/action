import * as core from '@actions/core'
// import {check_directory, check_urls} from './check'
import {check_urls} from './check'

export async function main(): Promise<void> {
    try {
        const repositories: string = core.getInput('repositories')

        if (repositories === '') {
            await check_directory()
        } else {
            await check_urls(repositories)
        }

    } catch (error) {
        core.setFailed(error.message)
    }
}
