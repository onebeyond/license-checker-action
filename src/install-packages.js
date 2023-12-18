const existSync = require("fs").existsSync;
const execSync = require("child_process").execSync;
const core = require("@actions/core");

const installPackages = () => {
  // Install npm packages
  core.debug("Check if package.json exists...");
  if (!existSync("./package.json")) {
    throw new Error("package.json not found");
  }
  core.debug("package.json found!");

  core.debug("Check if node_modules exists...");
  if (!existSync("./node_modules")) {
    core.debug("node_modules not found, installing packages...");
    execSync(`npm ci --silent --ignore-scripts`);
    core.debug("packages installed!");
  } else {
    core.debug("node_modules found!");
  }
};

module.exports = {
  installPackages,
};
