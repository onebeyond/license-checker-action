# npm License Checker javascript action

This action prints check licenses of npm dependencies.

## Inputs

### `failOn`

**Required** Fail (exit with code 1) if any package license does not satisfies any license in the provided list.

### `start`

Path of the initial json to look for. Default to the working directory

### `outputFilename`

Name of the output file generated

### `errorReportFileName`

Name of the file generated when a license in the failOn option is found

### `disableErrorReport`

Flag to disable the error report file generation

### `disableReport`

Flag to disable the report file generation, whether there is an error or not

### `customHeader`

Name of a text file containing the custom header to add at the start of the generated report

## Example usage

```yaml
uses: <marketplace-action-name> # Waiting until publishing
with:
  failOn: ["GPLv2", "GPLv3", "AGPL"]
```
