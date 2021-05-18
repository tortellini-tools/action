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

const showmeitworks = (pwd: string): void => {
    shell.exec(`docker run -v ${pwd}:/project ort analyze -i /project -o /project/ort/analyzer`)
}

showmeitworks("/tmp/ortolan.BEFrxB")
