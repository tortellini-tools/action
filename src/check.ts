// import {run_git_clone} from './git'
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

            const github_regexp =
                /(?<protocol>(git@|https:\/\/))(?<host>[\w.@]+)(\/|:)(?<owner>[\w,\-_]+)\/(?<repo>[\w,\-._]+)(.git){0,1}/
            const regex_matches = github_regexp.exec(repo_url)

            if (matches) {
                const regex_groups = regex_matches['groups']
                console.log(regex_groups)
                console.log(regex_groups['owner'])
                console.log(regex_groups['repo'])

                // run_git_clone(repo_url, groups['owner']) // dest folder should define the folder
                // await analyze(repo_dir, output_dir) //run analyze
            } else {
                console.error(`Invalid URL: ${repo_url}`)
            }
        }
    } catch (err) {
        console.error(err)
    }
}
