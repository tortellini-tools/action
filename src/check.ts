import {analyze} from './ort'

export function check_directory(
    repo_dir: string = '.',
    output_dir: string = 'out'
) {
    analyze(repo_dir, output_dir)
}
