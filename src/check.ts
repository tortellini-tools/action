import {analyze} from './ort'

export async function check_directory(
    repo_dir = '.',
    output_dir = 'out'
): Promise<void> {
    await analyze(repo_dir, output_dir)
}
