const { scan } = require("@onebeyond/license-checker/src/runner");
const core = require("@actions/core");
const { getOptions } = require("./options");

async function run() {
  try {
    const options = getOptions();

    core.debug(`Starting scan at: ${new Date().toLocaleTimeString("eu")}`);
    await scan(options);
    core.debug(`Finished scan at: ${new Date().toLocaleTimeString("eu")}`);

    core.info("License check completed! ✓");
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  run,
};
