import * as core from '@actions/core'
import * as io from '@actions/io'
import * as fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

export interface Config {
    curations: string
    rules: string
    classifications: string
}

export async function set_up_configuration(
    config_dir = path.join('.tortellini', 'config')
): Promise<void> {
    await io.mkdirP(config_dir)
    await Promise.all([
        set_up_configuration_file_or_url(
            'curations',
            path.join(config_dir, 'curations.yml')
        ),
        set_up_configuration_file_or_url(
            'rules',
            path.join(config_dir, 'rules.kts')
        ),
        set_up_configuration_file_or_url(
            'classifications',
            path.join(config_dir, 'license-classifications.yml')
        )
    ])
}

async function set_up_configuration_file_or_url(
    name: string,
    target_filename: string
): Promise<void> {
    const source: string = core.getInput(name)

    if (name === 'curations' && source === '') {
        // TODO check that ort understands empty curations.yml file
        await fs.promises.writeFile(
            target_filename,
            '- id: "PyPI::doenstexist930845729305784::version238923894"\n  curations:\n    comment: "Not a real curation."\n    concluded_license: "MIT"'
        )
        return
    }
    if (source.startsWith('http')) {
        const response = await fetch(source)
        const body = await response.text()
        await fs.promises.writeFile(target_filename, body)
        return
    } else {
        await io.cp(source, target_filename)
        return
    }
}
