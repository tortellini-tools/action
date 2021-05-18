// import * as core from '@actions/core'
// import {wait} from './wait'
//
// async function run(): Promise<void> {
//   try {
//     const ms: string = core.getInput('milliseconds')
//     core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
//
//     core.debug(new Date().toTimeString())
//     await wait(parseInt(ms, 10))
//     core.debug(new Date().toTimeString())
//
//     core.setOutput('time', new Date().toTimeString())
//   } catch (error) {
//     core.setFailed(error.message)
//   }
// }
//

import * as shell from '@actions/exec';


class Ortolan {
    private owner: string;
    private repo: string;

    constructor(owner: string, repo: string) {
        this.owner = owner;
        this.repo = repo;
    }

    analyze (): void {
        const cwd = process.cwd();
        const bindMountInput = `${cwd}/in/${this.owner}/${this.repo}:/project`;
        const bindMountOutput = `${cwd}/out/${this.owner}/${this.repo}:/out`;
        shell.exec(`docker run --rm -v ${bindMountInput} -v ${bindMountOutput} ort analyze -i /project -o /out`)
    }

    clone (): void {
        shell.exec(`git clone https://github.com/${this.owner}/${this.repo} in/${this.owner}/${this.repo}`);
    }

    run (): void {
        this.clone();
        this.analyze();
    }
}

const repositories = [
    {owner: "iomega", repo: "zenodo-upload"},
    {owner: "xenon-middleware", repo: "xenon-cli"}
]

repositories.forEach((repository):void => {
    const {owner, repo} = repository;
    const ortolan = new Ortolan(owner, repo);
    ortolan.run();
})

