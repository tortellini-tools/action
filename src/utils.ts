import {exec, ExecOptions} from '@actions/exec'
import {resolve} from 'path'

export async function run_docker_container(
    docker_args: string[],
    ort_args: string[],
    image = 'philipssoftware/ort'
) {
    const cmd = 'docker'
    let args = ['run', '--rm']
    args = args.concat(docker_args)
    args.push(image)
    args = args.concat(ort_args)

    let docker_stdout = ''
    let docker_stderr = ''

    const options: ExecOptions = {}
    options.listeners = {
        stdout: (data: Buffer) => {
            docker_stdout += data.toString()
        },
        stderr: (data: Buffer) => {
            docker_stderr += data.toString()
        }
    }
    try {
        await exec(cmd, args, options)
        return {
            exit_code: 0,
            stdout: docker_stdout,
            stderr: docker_stderr
        }
    } catch (error) {
        return {
            exit_code: 1,
            stdout: '',
            stderr: error.message
        }
    }
}

export function volume2dockerargs(volumes: {[x: string]: string}) {
    const docker_args: string[] = []
    Object.entries(volumes).forEach(([outside, inside]) => {
        const outside_absolute = resolve(outside)
        if (!inside) {
            throw Error('Value can not be falsy')
        }
        const bind_mount = `${outside_absolute}:${inside}`
        docker_args.push('-v')
        docker_args.push(bind_mount)
    })
    return docker_args
}
