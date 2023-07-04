const core = require('@actions/core')
const wait = require('./wait')
const execSync = require('child_process').execSync
const existSync = require('fs').existsSync

// most @actions toolkit packages have async methods
async function run () {
  try {
    if (!existSync('./package.json')) {
      throw new Error('package.json not found')
    }

    const failOn = core.getInput('failOn')
    if (!failOn) {
      throw new Error('failOn is required')
    }

    core.info(`Checking if any of these licenses are found: ${failOn} ...`)
    execSync(`npx @onebeyond/license-checker --failOn ${failOn} -y`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
