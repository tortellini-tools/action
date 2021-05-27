import {setFailed} from '@actions/core'
import {check_directory} from './check'

export async function main(): Promise<void> {
    try {
        await check_directory()
    } catch (error) {
        setFailed(error.message)
    }
}
