import {exec, ExecOptions} from '@actions/exec'
interface RunResult {
    exit_code: number
    stdout: string
    stderr: string
}

export async function run_git_clone(
    repo_url: string,
    repo_owner: string,
    repo_name: string,
    git_args: string[] = ['--verbose']
): Promise<RunResult> {
    const cmd = 'git'
    let args = ['clone']
    args = args.concat(git_args)
    args.push(repo_url)
    args.concat(repo_owner, '/', repo_name)

    let git_stdout = ''
    let git_stderr = ''

    const options: ExecOptions = {
        ignoreReturnCode: true
    }
    options.listeners = {
        stdout: (data: Buffer) => {
            git_stdout += data.toString()
        },
        stderr: (data: Buffer) => {
            git_stderr += data.toString()
        }
    }
    const exit_code = await exec(cmd, args, options)
    return {
        exit_code,
        stdout: git_stdout,
        stderr: git_stderr
    }
}

export interface GitRepo {
    owner: string
    repo: string
}

export function get_owner_and_repo(url: string): GitRepo {
    const url_prefix = 'https://github.com/'
    let owner = ''
    let repo = ''
    try {
        const url_split = url.slice(url_prefix.length).split('/')
        owner = url_split[0]
        repo = url_split[1]
        if (!owner || !repo) {
            throw Error('Cannot get owner or repo name.')
        }
    } catch (error) {
        console.error(error.message)
    }
    return {
        owner,
        repo
    }
}
