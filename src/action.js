const core = require('@actions/core')
const wait = require('./wait')
const execSync = require('child_process').execSync
const existSync = require('fs').existsSync

// most @actions toolkit packages have async methods
async function run () {
  try {
    if (!existSync('./package.json')) {
      core.setFailed('package.json not found');
      return
    }

    const failOn = core.getInput('failOn')
    if (!failOn) {
      core.setFailed('failOn is required')
      return
    }

    core.info(`Checking if any of these licenses are found: ${failOn} ...`)
    execSync(`npx @onebeyond/license-checker --failOn ${failOn}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
