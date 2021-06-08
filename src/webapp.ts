import fs from 'fs'
import path from 'path'
import { GitRepo } from './git'


export type SummaryStatistics = Array<GitRepo & {
    report: string
}>

export async function write_overview(output_dir: string, data: SummaryStatistics) {
    const template_filename = path.join(__dirname, 'index.html.template')
    const template = await fs.promises.readFile(template_filename, 'utf8')
    const app = template.replace('{{node inserts the data here}}', JSON.stringify(data))
    const filename = path.join(output_dir, 'index.html')
    await fs.promises.writeFile(filename, app, 'utf8')
}
