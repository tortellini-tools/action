import {run_docker_container, volume2dockerargs} from './docker'

/**
 *
 * @param repo_dir Relative path to repo directory
 * @param analyze_dir Relative path to directory where result will be written
 */
export async function analyze(
    repo_dir: string,
    analyze_dir: string
): Promise<void> {
    const volumes = {
        [repo_dir]: '/repo',
        [analyze_dir]: '/analyze'
    }
    const docker_args: string[] = volume2dockerargs(volumes)

    const ort_args = ['analyze', '-i', '/repo', '-o', '/analyze']
    await run_docker_container(docker_args, ort_args)
}
