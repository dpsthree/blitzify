import { Config, processArgs } from './config';
import { createBlitzList } from './blitzify';

/**
 * Process the commandline arguments and
 * setup blitzify defaults
 */
const args: Config = processArgs();

console.log('Blitzifying, please wait...');

// Start the process and report on any unhandled errors
createBlitzList(args)
  .catch(err => console.error(err));
