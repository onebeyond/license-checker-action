const core = require('@actions/core')
const wait = require('./wait')
const execSync = require('child_process').execSync

// most @actions toolkit packages have async methods
async function run () {
  try {
    const failOn = core.getInput('failOn')
    if (!failOn) {
      throw new Error('failOn is required')
    }

    core.info(`Checking if any of these licenses are found: ${failOn} ...`)
    execSync(`node_modules/.bin/@onebeyond/license-checker --failOn ${failOn}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
