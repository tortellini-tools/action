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

        // get the total number of repositories
        const n_gitrepos = gitrepos.length

        // clone each repo and run analyze
        for (const [i_gitrepo, gitrepo] of gitrepos.entries()) {
            print_collapsable_start(i_gitrepo, n_gitrepos, gitrepo)
            const input_path = `${input_dir}/${gitrepo.owner}/${gitrepo.repo}`
            const output_path = `${output_dir}/${gitrepo.owner}/${gitrepo.repo}`
            await run_git_clone(gitrepo.url, input_path)
            await analyze(input_path, output_path)
            print_collapsable_end()
        }
    } catch (err) {
        console.error(err)
    }
}

function print_collapsable_end(): void {
    console.log('::endgroup::')
}

function print_collapsable_start(i: number, n: number, gitrepo: GitRepo): void {
    console.log(`::group::${i}/${n}: ${gitrepo.owner}/${gitrepo.repo}`)
}
