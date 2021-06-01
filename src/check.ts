import {run_git_clone, get_owner_and_repo, GitRepo} from './git'
import {analyze} from './ort'
import * as fs from 'fs'

export async function check_directory(
    input_dir = '.',
    output_dir = 'out'
): Promise<void> {
    await analyze(input_dir, output_dir)
}

export async function check_urls(
    repositories: string,
    input_dir = 'in',
    output_dir = 'out'
): Promise<void> {
    try {
        // read the list of urls from file
        const urls: string[] = fs
            .readFileSync(repositories, 'utf-8')
            .trim()
            .split(/\r?\n/)

        // get repo owner and repo name
        const gitrepos: GitRepo[] = urls.map(get_owner_and_repo)

        // clone each repo and run analyze
        for (const gitrepo of gitrepos) {
            const input_path = `${input_dir}/${gitrepo.owner}/${gitrepo.repo}`
            const output_path = `${output_dir}/${gitrepo.owner}/${gitrepo.repo}`
            await run_git_clone(gitrepo.url, input_path)
            await analyze(input_path, output_path)
        }
    } catch (err) {
        console.error(err)
    }
}
