import {
    parse_html,
    decode_blob,
    evaluated_model2stats,
    RepoStats,
    EvaluatedModel
} from '../src/stats'

describe('parse_html()', () => {
    describe('when given a HTML file with fake ort-report-data blob', () => {
        let webapp_content: string

        beforeEach(() => {
            webapp_content = `<!doctype html>
                <html lang = "en">
                    <body>
                        <script type = "application/gzip" id = "ort-report-data">
                            a huge blob
                        </script>
                    </body>
                </html>`
        })

        it('should return fake blob', () => {
            const blob = parse_html(webapp_content)
            expect(blob).toContain('a huge blob')
        })
    })
})

describe('decode_blob()', () => {
    describe('when given a blob taken from a scan-report-web-app.html of https://github.com/eWaterCycle/ewatercycle', () => {
        const blob =
            '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'

        it('should return a JSON object', () => {
            const actual = decode_blob(blob)
            const expected = {
                path_excludes: [],
                scope_excludes: [],
                copyrights: [],
                licenses: [
                    {
                        _id: 0,
                        id: 'MIT'
                    },
                    {
                        _id: 1,
                        id: 'MIT License'
                    },
                    {
                        _id: 2,
                        id: 'MIT license'
                    }
                ],
                scopes: [
                    {
                        _id: 0,
                        name: 'install'
                    }
                ],
                issue_resolutions: [],
                issues: [
                    {
                        _id: 0,
                        timestamp: '2021-05-11T09:53:01.991081Z',
                        type: 'ANALYZER',
                        source: 'PIP',
                        severity: 'ERROR',
                        pkg: 0
                    }
                ],
                scan_results: [],
                packages: [
                    {
                        _id: 0,
                        id: 'PIP::setup.py:',
                        is_project: true,
                        definition_file_path: 'setup.py',
                        declared_licenses_processed: {},
                        binary_artifact: {
                            url: '',
                            hash: {
                                value: '',
                                algorithm: ''
                            }
                        },
                        source_artifact: {
                            url: '',
                            hash: {
                                value: '',
                                algorithm: ''
                            }
                        },
                        vcs: {
                            type: '',
                            url: '',
                            revision: '',
                            path: ''
                        },
                        vcs_processed: {
                            type: 'Git',
                            url: 'https://github.com/eWaterCycle/ewatercycle.git',
                            revision:
                                '5a471ee8164f1c5f501074d7014c725dc5142e5d',
                            path: ''
                        },
                        paths: [],
                        levels: [0],
                        is_excluded: false,
                        issues: [0]
                    },
                    {
                        _id: 1,
                        id: 'PIP::docs/requirements.txt:5a471ee8164f1c5f501074d7014c725dc5142e5d',
                        is_project: true,
                        definition_file_path: 'docs/requirements.txt',
                        declared_licenses_processed: {},
                        binary_artifact: {
                            url: '',
                            hash: {
                                value: '',
                                algorithm: ''
                            }
                        },
                        source_artifact: {
                            url: '',
                            hash: {
                                value: '',
                                algorithm: ''
                            }
                        },
                        vcs: {
                            type: '',
                            url: '',
                            revision: '',
                            path: ''
                        },
                        vcs_processed: {
                            type: 'Git',
                            url: 'https://github.com/eWaterCycle/ewatercycle.git',
                            revision:
                                '5a471ee8164f1c5f501074d7014c725dc5142e5d',
                            path: 'docs'
                        },
                        paths: [],
                        levels: [0],
                        is_excluded: false
                    },
                    {
                        _id: 2,
                        id: 'PyPI::ruamel-yaml-clib:0.2.2',
                        is_project: false,
                        definition_file_path: '',
                        purl: 'pkg:pypi/ruamel-yaml-clib@0.2.2',
                        declared_licenses: [0, 1],
                        declared_licenses_processed: {
                            spdx_expression: 'MIT',
                            mapped_licenses: [0]
                        },
                        description:
                            'C version of reader, parser and emitter for ruamel.yaml derived from libyaml',
                        homepage_url:
                            'https://sourceforge.net/p/ruamel-yaml-clib/code/ci/default/tree',
                        binary_artifact: {
                            url: 'https://files.pythonhosted.org/packages/31/bd/40071f2200d5e3eeaad85687064c3867cd5565b147c5ea7e9611bc0d4c0a/ruamel.yaml.clib-0.2.2-cp27-cp27m-macosx_10_9_x86_64.whl',
                            hash: {
                                value: '7ce41f17d3eea47ca6054f76afa7b959',
                                algorithm: 'MD5'
                            }
                        },
                        source_artifact: {
                            url: 'https://files.pythonhosted.org/packages/fa/a1/f9c009a633fce3609e314294c7963abe64934d972abea257dce16a15666f/ruamel.yaml.clib-0.2.2.tar.gz',
                            hash: {
                                value: '9995832267e5b900692490f273285bdb',
                                algorithm: 'MD5'
                            }
                        },
                        vcs: {
                            type: '',
                            url: '',
                            revision: '',
                            path: ''
                        },
                        vcs_processed: {
                            type: '',
                            url: '',
                            revision: '',
                            path: ''
                        },
                        paths: [0],
                        levels: [1],
                        scopes: [0],
                        is_excluded: false
                    },
                    {
                        _id: 3,
                        id: 'PyPI::ruamel-yaml:0.17.4',
                        is_project: false,
                        definition_file_path: '',
                        purl: 'pkg:pypi/ruamel-yaml@0.17.4',
                        declared_licenses: [1, 2],
                        declared_licenses_processed: {
                            spdx_expression: 'MIT',
                            mapped_licenses: [0]
                        },
                        description:
                            'ruamel.yaml is a YAML parser/emitter that supports roundtrip preservation of comments, seq/map flow style, and map key order',
                        homepage_url:
                            'https://sourceforge.net/p/ruamel-yaml/code/ci/default/tree',
                        binary_artifact: {
                            url: 'https://files.pythonhosted.org/packages/29/4e/c3105bbbbc662f6a671a505f00ec771e93b5254f09fbb06002af9087071a/ruamel.yaml-0.17.4-py3-none-any.whl',
                            hash: {
                                value: '9d01a43141cf1c3a0496c1c30b816863',
                                algorithm: 'MD5'
                            }
                        },
                        source_artifact: {
                            url: 'https://files.pythonhosted.org/packages/62/cf/148028462ab88a71046ba0a30780357ae9e07125863ea9ca7808f1ea3798/ruamel.yaml-0.17.4.tar.gz',
                            hash: {
                                value: 'e27cb56d8f793c9e2cd0150a362175ed',
                                algorithm: 'MD5'
                            }
                        },
                        vcs: {
                            type: '',
                            url: '',
                            revision: '',
                            path: ''
                        },
                        vcs_processed: {
                            type: '',
                            url: '',
                            revision: '',
                            path: ''
                        },
                        paths: [1],
                        levels: [0],
                        scopes: [0],
                        is_excluded: false
                    }
                ],
                paths: [
                    {
                        _id: 0,
                        pkg: 2,
                        project: 1,
                        scope: 0,
                        path: [3]
                    },
                    {
                        _id: 1,
                        pkg: 3,
                        project: 1,
                        scope: 0,
                        path: []
                    }
                ],
                dependency_trees: [
                    {
                        key: 0,
                        pkg: 1,
                        children: [
                            {
                                key: 1,
                                scope: 0,
                                children: [
                                    {
                                        key: 2,
                                        linkage: 'DYNAMIC',
                                        pkg: 3,
                                        children: [
                                            {
                                                key: 3,
                                                linkage: 'DYNAMIC',
                                                pkg: 2
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 4,
                        pkg: 0
                    }
                ],
                rule_violation_resolutions: [],
                rule_violations: [],
                statistics: {
                    open_issues: {
                        errors: 1,
                        warnings: 0,
                        hints: 0
                    },
                    open_rule_violations: {
                        errors: 0,
                        warnings: 0,
                        hints: 0
                    },
                    dependency_tree: {
                        included_projects: 2,
                        excluded_projects: 0,
                        included_packages: 2,
                        excludes_packages: 0,
                        total_tree_depth: 2,
                        included_tree_depth: 2,
                        included_scopes: ['install'],
                        excluded_scopes: []
                    },
                    licenses: {
                        declared: {
                            MIT: 2
                        },
                        detected: {}
                    }
                },
                repository: {
                    vcs: {
                        type: 'Git',
                        url: 'https://github.com/eWaterCycle/ewatercycle',
                        revision: '5a471ee8164f1c5f501074d7014c725dc5142e5d',
                        path: ''
                    },
                    vcs_processed: {
                        type: 'Git',
                        url: 'https://github.com/eWaterCycle/ewatercycle.git',
                        revision: '5a471ee8164f1c5f501074d7014c725dc5142e5d',
                        path: ''
                    },
                    config: {}
                },
                repository_configuration: '--- {}\n',
                labels: {}
            }
            // remove issue messsage because it contains hard to compare chars
            delete actual.issues[0].message
            expect(actual).toEqual(expected)
        })
    })
})

describe('evaluated_model2stats()', () => {
    describe('when given a blob, generate the stats', () => {
        const blob =
            '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'

        it('should return a JSON object', () => {
            const decoded_blob = decode_blob(blob)
            let actual_stats: RepoStats = evaluated_model2stats(decoded_blob)
            const expected_stats = {
                open_issues: {errors: 1, warnings: 0, hints: 0},
                open_rule_violations: {errors: 0, warnings: 0, hints: 0},
                dependency_tree: {
                    included_projects: 2,
                    excluded_projects: 0,
                    included_packages: 2,
                    excludes_packages: 0,
                    total_tree_depth: 2,
                    included_tree_depth: 2,
                    included_scopes: ['install'],
                    excluded_scopes: []
                },
                licenses: {declared: {MIT: 2}, detected: {}}
            }
            console.log(actual_stats)
            expect(actual_stats).toEqual(expected_stats)
        })
    })
})
