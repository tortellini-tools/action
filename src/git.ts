import {exec, ExecOptions} from '@actions/exec'
interface RunResult {
    exit_code: number
    stdout: string
    stderr: string
}

export async function run_git_clone(
    repo_url: string,
    clone_path: string,
    git_args: string[] = ['--verbose']
): Promise<RunResult> {
    const cmd = 'git'
    let args = ['clone']
    args = args.concat(git_args)
    args.push(repo_url)
    args.push(clone_path)

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
    url: string
}

export function get_owner_and_repo(url: string): GitRepo {
    const prefix = 'https://github.com/'

    if (url.length < prefix.length) {
        throw Error('Cannot get owner or repo name: url too short.')
    }
    if (!url.startsWith(prefix)) {
        throw Error(`Cannot get owner or repo name: expected url to start with '${prefix}'.`)
    }

    let owner: string = ''
    let repo: string = ''

    try {
        [owner, repo] = url.slice(prefix.length).split('/').slice(0, 2)
    } catch (error) {
        console.error(url)
        console.error(error.message)
    }

    return {
        owner,
        repo,
        url
    }
}
