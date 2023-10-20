const { scan } = require("@onebeyond/license-checker/src/runner");
const core = require("@actions/core");

async function run() {
  try {
    const timestamp = new Date().toISOString();

    // TODO: Input validation
    const options = {
      // `failOn` input: fail (exit with code 1) if any package license does not satisfies any license in the provided list
      failOn: core.getInput("failOn", { required: true }).split(","),
      // `start` input: path of the initial json to look for
      start: core.getInput("start") || process.cwd(),
      // `outputFileName` input: name of the output file generated
      outputFileName:
        core.getInput("outputFileName") || `license-report-${timestamp}.json`,
      // `errorReportFileName` input: name of the file generated when a license in the failOn option is found
      errorReportFileName:
        core.getInput("errorReportFileName") ||
        `license-error-${timestamp}.json`,
      // `disableErrorReport` input: flag to disable the error report file generation
      disableErrorReport: core.getInput("disableErrorReport") || false,
      // `disableReport` input: flag to disable the report file generation, whether there is an error or not
      disableReport: core.getInput("disableReport") || false,
      // `customHeader` input: name of a text file containing the custom header to add at the start of the generated report
      customHeader: core.getInput("customHeader"),
    };

    core.debug(new Date().toLocaleTimeString("eu"));
    await scan(options);
    core.debug(new Date().toLocaleTimeString("eu"));
    core.info("License check completed! ✓");
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  run,
};
