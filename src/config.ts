import * as yargs from 'yargs';

/**
 * By default Blitzify will look for numbered steps tagged with
 * git commits starting with the specified prefix. These will be printed
 * out as markdown web links to the outfile. Within the outfile it will
 * look for the marker to determine where it should be placed.
 */
const DEFAULT_PREFIX = 'step-',
  DEFAULT_OUTFILE = 'README.md',
  DEFAULT_MARKER = '----stackblitz list----';


/** Defines the type of the object returned by yargs */
export interface Config extends yargs.Arguments {
  prefix?: string;
  outfile?: string;
  marker?: string;
}

/**
 * Utilizes the yargs library to process command line arguments
 * Also sets the default values in case the user chooses not to override them
 */
export function processArgs() {
  return yargs
    .usage('$0 <cmd> [args]')
    .config()

    .string('p')
    .alias('p', 'prefix')
    .describe('p', 'git tag prefix to be used for splitting')
    .default('p', DEFAULT_PREFIX)

    .string('o')
    .alias('o', 'outfile')
    .describe('o', 'file used to capture list of steps')
    .default('o', DEFAULT_OUTFILE)

    .string('m')
    .alias('m', 'marker')
    .describe('m', 'string used to indicate where output should be placed within the outfile')
    .default('m', DEFAULT_MARKER)

    .help()
    .argv as Config;
}
