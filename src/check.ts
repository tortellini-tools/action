import {run_git_clone, get_owner_and_repo, GitRepo} from './git'
import {analyze} from './ort'
import * as fs from 'fs'
import * as core from '@actions/core'


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
           
            const group_title = `${i_gitrepo}/${n_gitrepos}: ${gitrepo.owner}/${gitrepo.repo}`
            await core.group(group_title, async () => {
                await make_output_group(input_dir, output_dir, gitrepo)
            })
        }
    } catch (err) {
        console.error(err)
    }
}

const make_output_group = async (input_dir: string, output_dir: string, gitrepo: GitRepo): Promise<void> => {
    const input_path = `${input_dir}/${gitrepo.owner}/${gitrepo.repo}`
    const output_path = `${output_dir}/${gitrepo.owner}/${gitrepo.repo}`
    await run_git_clone(gitrepo.url, input_path)
    await analyze(input_path, output_path)
}
