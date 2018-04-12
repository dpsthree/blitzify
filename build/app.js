"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const blitzify_1 = require("./blitzify");
// Start the process and report on any unhandled errors
const execute = function () {
    /**
     * Process the commandline arguments and
     * setup blitzify defaults
     */
    const args = config_1.processArgs();
    console.log('Blitzifying, please wait...');
    blitzify_1.createBlitzList(args)
        .catch(err => console.error(err));
};
// Expose default method for global execution
exports.execute = execute;
//# sourceMappingURL=app.js.map