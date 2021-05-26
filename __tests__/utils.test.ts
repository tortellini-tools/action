import {exec} from '@actions/exec'
import {run_docker_container, volume2dockerargs} from '../src/utils'

describe('run_docker_container()', () => {
    describe('with hello-world image', () => {
        const image = 'hello-world'

        beforeAll(() => {
            exec('docker', ['pull', image])
        })

        test('empty arrays', async () => {
            const result = await run_docker_container([], [], image)
            expect(result.exit_code).toEqual(0)
            expect(result.stdout).toContain('Hello from Docker')
            expect(result.stderr).toEqual('')
        })
    })

    describe('with busybox image', () => {
        const image = 'busybox'

        beforeAll(() => {
            exec('docker', ['pull', image])
        })

        test('ort_args = whoami', async () => {
            const result = await run_docker_container([], ['whoami'], image)
            expect(result.exit_code).toEqual(0)
            expect(result.stdout).toContain('root')
            expect(result.stderr).toEqual('')
        })

        test('mount LICENSE', async () => {
            const docker_args = ['-v', `${process.cwd()}:/repo`]
            const ort_args = ['md5sum', '/repo/LICENSE']
            const result = await run_docker_container(
                docker_args,
                ort_args,
                image
            )
            expect(result.exit_code).toEqual(0)
            expect(result.stdout).toContain(
                '86d3f3a95c324c9479bd8986968f4327  /repo/LICENSE'
            )
            expect(result.stderr).toEqual('')
        })

        test('ort_args = ls non existing file', async () => {
            const result = await run_docker_container([], ['ls', '/foo'], image)
            expect(result.exit_code).toEqual(1)
            expect(result.stdout).toEqual('')
            expect(result.stderr).toEqual(
                "The process '/usr/bin/docker' failed with exit code 1"
            )
        })
    })
})

describe('volume2dockerargs()', () => {
    test('empty object', () => {
        const volumes = {}
        const docker_args = volume2dockerargs(volumes)
        const expected: string[] = []
        expect(docker_args).toEqual(expected)
    })

    test('empty strings', () => {
        const volumes = {
            '': ''
        }
        expect(() => volume2dockerargs(volumes)).toThrowError(
            'Value can not be falsy'
        )
    })

    test('/tmp:/repo', () => {
        const volumes = {
            '/tmp': '/repo'
        }
        const docker_args = volume2dockerargs(volumes)
        const expected: string[] = ['-v', '/tmp:/repo']
        expect(docker_args).toEqual(expected)
    })

    test('empty outside -> mounts cwd', () => {
        const volumes = {
            '': '/repo'
        }
        const docker_args = volume2dockerargs(volumes)
        const expected: string[] = ['-v', `${process.cwd()}:/repo`]
        expect(docker_args).toEqual(expected)
    })

    test('some empty string', () => {
        const volumes = {
            '/tmp': ''
        }
        expect(() => volume2dockerargs(volumes)).toThrowError(
            'Value can not be falsy'
        )
    })

    test('2 volumes', () => {
        const volumes = {
            '/outrepo1': '/inrepo1',
            '/outrepo2': '/inrepo2'
        }
        const docker_args = volume2dockerargs(volumes)
        const expected: string[] = [
            '-v',
            '/outrepo1:/inrepo1',
            '-v',
            '/outrepo2:/inrepo2'
        ]
        expect(docker_args).toEqual(expected)
    })
})
