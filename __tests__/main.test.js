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
const debugMock = jest.spyOn(core, "debug").mockImplementation();
const infoMock = jest.spyOn(core, "info").mockImplementation();
const getInputMock = jest.spyOn(core, "getInput").mockImplementation();
const setFailedMock = jest.spyOn(core, "setFailed").mockImplementation();

// Mock the action's main function
const runMock = jest.spyOn(main, "run");

// Other utilities
const timeRegex = new RegExp(/[0-3][0-9]:[0-5][0-9]:[0-5][0-9]/);

describe("action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Checks the licenses", async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name) => {
      switch (name) {
        case "failOn":
          return ["AGPL-3.0"];
        default:
          return "";
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching(timeRegex)
    );
    expect(debugMock).toHaveBeenNthCalledWith(
      2,
      expect.stringMatching(timeRegex)
    );
    expect(infoMock).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching("License check completed! ✓")
    );
  });

  it("sets a failed status", async () => {
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
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      // Error thrown by the library @onebeyond/license-checker when failOn is not a list
      "licenses.some is not a function"
    );
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

  // TODO: More tests with input validation and different combinations
});
