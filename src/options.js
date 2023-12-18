const core = require("@actions/core");

const getOptions = () => {
  const timestamp = new Date().toISOString();

  const options = {
    // `failOn` input: fail (exit with code 1) if any package license does not satisfies any license in the provided list
    failOn: getOption({
      option: "failOn",
      type: "csv",
      validation: { required: true },
    }),
    // `start` input: path of the initial json to look for
    start: getOption({
      option: "start",
      type: "path",
      defaultValue: process.cwd(),
    }),
    // `outputFileName` input: name of the output file generated
    outputFileName: getOption({
      option: "outputFileName",
      type: "string",
      defaultValue: `license-report-${timestamp}.json`,
    }),
    // `errorReportFileName` input: name of the file generated when a license in the failOn option is found
    errorReportFileName: getOption({
      option: "errorReportFileName",
      type: "string",
      defaultValue: `license-error-${timestamp}.json`,
    }),
    // `disableErrorReport` input: flag to disable the error report file generation
    disableErrorReport: getOption({
      option: "disableErrorReport",
      type: "boolean",
      defaultValue: false,
    }),
    // `disableReport` input: flag to disable the report file generation, whether there is an error or not
    disableReport: getOption({
      option: "disableReport",
      type: "boolean",
      defaultValue: false,
    }),
    // `customHeader` input: name of a text file containing the custom header to add at the start of the generated report
    customHeader: getOption({
      option: "customHeader",
      type: "string",
    }),
  };
  return options;
};

const getOption = ({ option, type, validation, defaultValue }) => {
  const value = core.getInput(option, validation);
  // Empty value === ''
  if (!value) return defaultValue;

  if (["csv", "string", "path"].includes(type)) {
    if (typeof value !== "string") {
      throw new Error(
        `The ${option} option must be a ${type} (received ${typeof value})`
      );
    }
    if (type === "csv") return value.split(",");
  } else if (type === "boolean") {
    if (!["true", "TRUE", "false", "FALSE"].includes(value))
      throw new Error(
        `The ${option} option must be a ${type} (received ${typeof value})`
      );
    return value === "true";
  }
  return value;
};

module.exports = {
  getOptions,
};
