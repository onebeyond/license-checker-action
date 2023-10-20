const core = require("@actions/core");
const { scan } = require("@onebeyond/license-checker/src/runner");

const timestamp = new Date().toISOString();

// `failOn` input: fail (exit with code 1) if any package license does not satisfies any license in the provided list
const failOn = core.getInput("failOn", { required: true });
// `start` input: path of the initial json to look for
const start = core.getInput("start");
// `outputFileName` input: name of the output file generated
const outputFileName = core.getInput("outputFileName");
// `errorReportFileName` input: name of the file generated when a license in the failOn option is found
const errorReportFileName = core.getInput("errorReportFileName");
// `disableErrorReport` input: flag to disable the error report file generation
const disableErrorReport = core.getInput("disableErrorReport");
// `disableReport` input: flag to disable the report file generation, whether there is an error or not
const disableReport = core.getInput("disableReport");
// `customHeader` input: name of a text file containing the custom header to add at the start of the generated report
const customHeader = core.getInput("customHeader");

// Scan for forbidden packages
scan({
  failOn,
  start: start || process.cwd(),
  outputFileName: outputFileName || `license-report-${timestamp}.json`,
  errorReportFileName: errorReportFileName || `license-error-${timestamp}.json`,
  disableErrorReport: disableErrorReport || false,
  disableReport: disableReport || false,
  customHeader: customHeader,
})
  .then(() => {
    console.log(`License report generated at ${outputFileName}`);
  })
  .catch((error) => {
    core.setFailed(error.message);
  });
