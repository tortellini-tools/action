import {run_git_clone, get_owner_and_repo, GitRepo} from './git'
import {analyze} from './ort'
import * as fs from 'fs'

export async function check_directory(
    repo_dir = '.',
    output_dir = 'out'
): Promise<void> {
    await analyze(repo_dir, output_dir)
}

export async function check_urls(
    repositories: string,
    clone_dir = 'in',
    output_dir = 'out'
): Promise<void> {
    try {
        const url_data: string = fs
            .readFileSync(repositories, 'utf-8')
            .toString()
            .trim()

        // split the contents by new line
        const url_list: string[] = url_data.split(/\r?\n/)

        // get repo owner and repo name
        const all_repo_info: GitRepo[] = url_list.map(get_owner_and_repo)

        // clone each repo and run analyze
        for (const repo_info of all_repo_info) {
            const clone_path = clone_dir.concat(
                '/',
                repo_info.owner,
                '/',
                repo_info.repo
            )
            const analyze_path = output_dir.concat(
                '/',
                repo_info.owner,
                '/',
                repo_info.repo
            )
            await run_git_clone(repo_info.url, clone_path)
            await analyze(clone_path, analyze_path)
        }
    } catch (err) {
        console.error(err)
    }
}
