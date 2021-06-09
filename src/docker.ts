import {exec, ExecOptions} from '@actions/exec'
import {resolve} from 'path'

interface RunResult {
    exit_code: number
    stdout: string
    stderr: string
}

export async function run_docker_container(
    docker_args: string[],
    ort_args: string[],
    image = 'philipssoftware/ort:2021-05-23'
): Promise<RunResult> {
    const cmd = 'docker'
    const args = ['run', '--rm', ...docker_args, image, ...ort_args]

    let docker_stdout = ''
    let docker_stderr = ''

    const options: ExecOptions = {
        ignoreReturnCode: true
    }
    options.listeners = {
        stdout: (data: Buffer) => {
            docker_stdout += data.toString()
        },
        stderr: (data: Buffer) => {
            docker_stderr += data.toString()
        }
    }
    const exit_code = await exec(cmd, args, options)
    return {
        exit_code,
        stdout: docker_stdout,
        stderr: docker_stderr
    }
}

export function volume2dockerargs(volumes: {[x: string]: string}): string[] {
    const docker_args: string[] = []
    for (const [outside, inside] of Object.entries(volumes)) {
        const outside_absolute = resolve(outside)
        if (!inside) {
            throw Error('Value can not be falsy')
        }
        const bind_mount = `${outside_absolute}:${inside}`
        docker_args.push('-v')
        docker_args.push(bind_mount)
    }
    return docker_args
}
