/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */
const core = require("@actions/core");
const main = require("../src/main");

// Mock the GitHub Actions core library
const infoMock = jest.spyOn(core, "info").mockImplementation();
const getInputMock = jest.spyOn(core, "getInput").mockImplementation();
const setFailedMock = jest.spyOn(core, "setFailed").mockImplementation();

// Mock the action's main function
const runMock = jest.spyOn(main, "run");

describe("Should pass", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Checks the licenses", async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name) => {
      switch (name) {
        case "failOn":
          return "AGPL-3.0";
        default:
          return "";
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(infoMock).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching("License check completed! ✓")
    );
  });
});

describe("Should fail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const typeErrorCollectionConfig = [
    {
      field: "start",
      value: 25,
      expected: "path",
      received: "number",
    },
    {
      field: "failOn",
      value: 10,
      expected: "csv",
      received: "number",
    },
    {
      field: "outputFileName",
      value: 10,
      expected: "string",
      received: "number",
    },
    {
      field: "errorReportFileName",
      value: 10,
      expected: "string",
      received: "number",
    },
    {
      field: "disableErrorReport",
      value: 10,
      expected: "boolean",
      received: "number",
    },
    {
      field: "disableReport",
      value: 10,
      expected: "boolean",
      received: "number",
    },
    {
      field: "customHeader",
      value: 10,
      expected: "string",
      received: "number",
    },
  ];

  typeErrorCollectionConfig.forEach((config) => {
    it(`Fails due to incorrect '${config.field}' type: expected ${config.expected}, received ${config.received}`, async () => {
      // Set the action's inputs as return values from core.getInput()
      getInputMock.mockImplementation((name) => {
        switch (name) {
          case "failOn":
            return config.field === "failOn" ? config.value : "AGPL-3.0";
          case config.field:
            return config.value;
          default:
            return "";
        }
      });
      await main.run();
      expect(runMock).toHaveReturned();

      // Verify that all of the core library functions were called correctly
      expect(setFailedMock).toHaveBeenNthCalledWith(
        1,
        // Error thrown when failOn is not a string
        `The ${config.field} option must be a ${config.expected} (received ${config.received})`
      );
    });
  });

  it("fails if no input is provided", async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name) => {
      switch (name) {
        case "failOn":
          throw new Error("Input required and not supplied: failOn");
        default:
          return "";
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      "Input required and not supplied: failOn"
    );
  });
});
