/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 29:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 654:
/***/ ((module) => {

module.exports = eval("require")("@onebeyond/license-checker/src/runner");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(29);
const { scan } = __nccwpck_require__(654);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;