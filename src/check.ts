import {analyze} from './ort'
import * as fs from 'fs'

export async function check_directory(
    repo_dir = '.',
    output_dir = 'out'
): Promise<void> {
    await analyze(repo_dir, output_dir)
}

export async function check_urls(repositories: string): Promise<void> {
    try {
        const url_data: string = fs.readFileSync(repositories, 'utf-8')

        // split the contents by new line
        const url_list: string[] = url_data.split(/\r?\n/)

        // iterate over list of urls, clone and run analyze
        for (const line of Object.entries(url_list)) {
            console.log(line)
            // clone_repo()
            // await analyze(repo_dir, output_dir)
        }
    } catch (err) {
        console.error(err)
    }
}
