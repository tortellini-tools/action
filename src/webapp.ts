import * as fs from 'fs'
import path from 'path'
import {GitRepo} from './git'
import {RepoStats} from './stats'

export type SummaryStatistics = (GitRepo &
    RepoStats & {
        report: string
    })[]

export async function write_overview(
    data: SummaryStatistics,
    file_path: string
): Promise<void> {
    const template_filename = path.join(
        __dirname,
        '..',
        'templates',
        'index.html.template'
    )
    const template = await fs.promises.readFile(template_filename, 'utf8')
    const app = template.replace(
        '{{node inserts the data here}}',
        JSON.stringify(data)
    )
    await fs.promises.writeFile(file_path, app, 'utf8')
    return
}
