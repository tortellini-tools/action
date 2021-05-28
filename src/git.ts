import {exec, ExecOptions} from '@actions/exec'
interface RunResult {
    exit_code: number
    stdout: string
    stderr: string
}

export async function run_git_clone(
    repo_url: string,
    repo_dir: string,
    git_args: string[] = ['--verbose']
): Promise<RunResult> {
    const cmd = 'git'
    let args = ['clone']
    args = args.concat(git_args)
    args.push(repo_url)
    args.push(repo_dir)

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
