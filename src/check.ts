import {run_git_clone} from './git'
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
        for (const repo_url of Object.values(url_list)) {
            console.log(repo_url)
            // const {owner, repo} = get_owner_and_repo(repo_url)
            run_git_clone(repo_url) // dest folder should define the folder
            // await analyze(repo_dir, output_dir) //run analyze
        }

        // const repo_info: GitRepo[] = url_list.map(get_owner_and_repo)

        // console.log(repo_info)

        // run_git_clone(repo_url) // dest folder should define the folder
        // await analyze(repo_dir, output_dir) //run analyze
    } catch (err) {
        console.error(err)
    }
}
