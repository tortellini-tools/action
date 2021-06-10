import * as fs from 'fs'
import {parse} from 'node-html-parser'
import atob from 'atob'
import * as pako from 'pako'

export interface RepoStats {
    issues: number
    dependencies: number
    licenses: number
    violations: number
    scopes: number
}
export interface OrtStatistics {
    open_issues: {
        errors: number
        warnings: number
        hints: number
    }
    open_rule_violations: {
        errors: number
        warnings: number
        hints: number
    }
    dependency_tree: {
        included_projects: number
        excluded_projects: number
        included_packages: number
        excludes_packages: number
        total_tree_depth: number
        included_tree_depth: number
        included_scopes: string[]
        excluded_scopes: string[]
    }
    licenses: {
        declared: Object
    }
}

export async function collect_stats(webapp_file: string): Promise<RepoStats> {
    const webapp_content = await fs.promises.readFile(webapp_file, {
        encoding: 'utf-8'
    })
    const blob = parse_html(webapp_content)
    const evaluated_model = decode_blob(blob)
    return evaluated_model2stats(evaluated_model)
}

export function parse_html(content: string): string {
    const root = parse(content)
    const element = root.querySelector('#ort-report-data')
    return element.textContent.trim()
}

interface Issue {
    message?: string
}

export interface EvaluatedModel {
    issues: Issue[]
    statistics: OrtStatistics
}

export function decode_blob(blob: string): EvaluatedModel {
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

export function evaluated_model2stats(
    evaluated_model: EvaluatedModel
): RepoStats {
    return {
        issues: evaluated_model.statistics.open_issues.errors,
        dependencies:
            evaluated_model.statistics.dependency_tree.included_packages,
        licenses: Object.keys(evaluated_model.statistics.licenses.declared)
            .length,
        violations: evaluated_model.statistics.open_rule_violations.errors,
        scopes: evaluated_model.statistics.dependency_tree.included_scopes
            .length
    }
}
