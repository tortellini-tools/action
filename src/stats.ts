import * as fs from 'fs'
import {parse} from 'node-html-parser'
import atob from 'atob'
import * as pako from 'pako'

export async function collect_stats(webapp_file: string): Promise<void> {
    const webapp_content = await fs.promises.readFile(webapp_file, {
        encoding: 'utf-8'
    })
    const blob = parse_html(webapp_content)
    const evaluated_model = decode_blob(blob)
    // return evaluated_model2stats(evaluated_model)
}

export function parse_html(content: string) {
    const root = parse(content)
    const element = root.querySelector('#ort-report-data')
    return element.textContent.trim()
}

export function decode_blob(blob: string) {
    // Copied from https://github.com/oss-review-toolkit/ort/blob/bd2494938a82843932738780ce27707900976334/reporter-web-app/src/sagas/index.js#L40-L51

    // Decode Base64 (convert ASCII to binary).
    const decodedBase64Data = atob(blob)

    // Convert binary string to character-number array.
    const charData = decodedBase64Data.split('').map(x => x.charCodeAt(0))

    // Turn number array into byte-array.
    const binData = new Uint8Array(charData)

    // Decompress byte-array.
    const data = pako.inflate(binData)

    return JSON.parse(new TextDecoder('utf-8').decode(data))
}

// export function evaluated_model2stats(evaluated_model) { }
