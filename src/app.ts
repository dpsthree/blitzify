import { Config, processArgs } from './config';
import { createBlitzList } from './blitzify';

// Start the process and report on any unhandled errors
const execute = function () {
  /**
   * Process the commandline arguments and
   * setup blitzify defaults
   */
  const args: Config = processArgs();
  console.log('Blitzifying, please wait...');
  createBlitzList(args)
    .catch(err => console.error(err));
};

// Expose default method for global execution
exports.execute = execute;
