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

        // // iterate over list of urls, clone and run analyze
        // for (const repo_url of Object.values(url_list)) {
        //     console.log(repo_url)
        //     // const {owner, repo} = get_owner_and_repo(repo_url)
        //     // run_git_clone(repo_url) // dest folder should define the folder
        //     // await analyze(repo_dir, output_dir) //run analyze
        // }

        const repo_info: GitRepo[] = url_list.map(get_owner_and_repo)

        // for (const repo_detail of Object.values(repo_info)) {
        //     console.log(repo_detail)
        //     const clone_path = repo_detail.owner.concat('/', repo_detail.repo)
        //     await run_git_clone(url_list[0], clone_path)
        //     await analyze(repo_dir, output_dir)
        // }

        for (const [index, val] of repo_info.entries()) {
            // your code goes here
            console.log(index)
            console.log(val)
            const clone_path = clone_dir.concat(
                repo_info[index].owner,
                '/',
                repo_info[index].repo
            )
            console.log(clone_path)
            const analyze_path = output_dir.concat('/', clone_path)
            console.log(analyze_path)
            await run_git_clone(url_list[index], clone_path)
            await analyze(clone_path, analyze_path)
        }

        // console.log(repo_info)
    } catch (err) {
        console.error(err)
    }
}
