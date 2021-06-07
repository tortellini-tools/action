import * as io from '@actions/io'
import * as glob from '@actions/glob'

export async function clean_artifacts(pattern: string[]): Promise<void> {
    console.log(`** using pattern: ${pattern}`)
    const globber = await glob.create(pattern.join('\n'), {
        followSymbolicLinks: true
    })
    for await (const artifact_file of globber.globGenerator()) {
        console.log(`** removing ${artifact_file}`)
        await io.rmRF(artifact_file)
    }
}
