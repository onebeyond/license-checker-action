# npm license-checker-action javascript action

This action prints check licenses of npm dependencies and makes the workflow to pass/fail depending on the result.

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
  failOn: ["GPL-1.0-or-later", "AGPL-3.0"]
```

## TODO

- Add husky pre-push hook for building and comiting the /dist folder before pushing
  - Could it be done in a GA instead?
- Add a GA for testing, linting and checking format
-
