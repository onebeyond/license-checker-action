const { scan } = require("@onebeyond/license-checker/src/runner");
const core = require("@actions/core");
const { getOptions } = require("./options");
const { installPackages } = require("./install-packages");

async function run() {
  try {
    // Install npm packages
    installPackages();

    const options = getOptions();

    core.debug(
      `Starting scan at: ${new Date().toLocaleTimeString(
        "eu"
      )} for the following licenses: ${options.failOn} from ${options.start}`
    );
    await scan(options);
    core.debug(`Finished scan at: ${new Date().toLocaleTimeString("eu")}`);
    var fs = require("fs");
    core.debug(fs.readdirSync("./"));

    core.info("License check completed! ✓");
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  run,
};
