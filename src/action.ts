import * as core from '@actions/core'
import {check_directory} from './check'

export async function main(): Promise<void> {
    try {
        const repositories: string = core.getInput('repositories')
        console.log(`repositories file is ${repositories}`)
        await check_directory()
    } catch (error) {
        core.setFailed(error.message)
    }
}
