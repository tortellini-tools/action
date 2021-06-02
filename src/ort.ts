import {run_docker_container, volume2dockerargs} from './docker'

/**
 *
 * @param input_dir Relative path to repo directory
 * @param output_dir Relative path to directory where result will be written
 */
export async function analyze(
    input_dir: string,
    output_dir: string
): Promise<void> {
    const volumes = {
        [input_dir]: '/in',
        [output_dir]: '/out'
    }
    const docker_args: string[] = volume2dockerargs(volumes)

    const ort_args = ['analyze', '-i', '/in', '-o', '/out']
    await run_docker_container(docker_args, ort_args)
}

export async function evaluate(
    input_dir: string,
    output_dir: string,
    config_dir: string
): Promise<void> {
    const volumes = {
        [input_dir]: '/in',
        [output_dir]: '/out',
        [config_dir]: '/config'
    }
    const docker_args: string[] = volume2dockerargs(volumes)

    const ort_args = [
        'evaluate',
        '--package-curations-file',
        '/config/curations.yml',
        '--rules-file',
        '/config/rules.kts',
        '--license-classifications-file',
        '/config/license-classifications.yml',
        '-i',
        '/in',
        '-o',
        '/out'
    ]
    await run_docker_container(docker_args, ort_args)
}
