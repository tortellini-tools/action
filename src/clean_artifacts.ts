import {userInfo} from 'os'
import * as io from '@actions/io'
import {run_docker_container, volume2dockerargs} from './docker'

export async function clean_artifacts(
    input_dir: string,
    output_dir: string,
    output_path: string
): Promise<void> {
    await chown(input_dir, output_dir)
    await Promise.all([
        io.rmRF(`${input_dir}`),
        io.rmRF(`${output_path}/analyzer-result.yml`),
        io.rmRF(`${output_path}/evaluation-result.yml`)
    ])
}

async function chown(input_dir: string, output_dir: string): Promise<void> {
    const volumes = {
        [input_dir]: '/in',
        [output_dir]: '/out'
    }
    const docker_args: string[] = volume2dockerargs(volumes)

    const {uid, gid} = userInfo()

    docker_args.push('--entrypoint', 'chown')
    const chown_args = ['-R', `${uid}:${gid}`, '/in', '/out']
    await run_docker_container(docker_args, chown_args)
}
