import * as shell from '@actions/exec'


export class Ortolan {
    private owner: string
    private repo: string

    constructor(owner: string, repo: string) {
        this.owner = owner
        this.repo = repo
    }

    analyze(): void {
        const cwd = process.cwd()
        const bindMountInput = `${cwd}/in/${this.owner}/${this.repo}:/project`
        const bindMountOutput = `${cwd}/out/${this.owner}/${this.repo}:/out`
        shell.exec(
            `docker run --rm -v ${bindMountInput} -v ${bindMountOutput} ort analyze -i /project -o /out`
        )
    }

    clone(): void {
        shell.exec(
            `git clone https://github.com/${this.owner}/${this.repo} in/${this.owner}/${this.repo}`
        )
    }

    run(): void {
        this.clone()
        this.analyze()
    }
}

