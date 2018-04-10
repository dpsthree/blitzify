import * as yargs from 'yargs';

/**
 * By default Blitzify will look for numbered steps tagged with
 * git commits starting with the specified prefix. It looks for these tags in the repo
 * indicated by the specified path. These will be printed
 * out as markdown web links to the outfile. Within the outfile it will
 * look for the marker to determine where it should be placed.
 */
const DEFAULT_PREFIX = 'step-',
  DEFAULT_OUTFILE = './README.md',
  DEFAULT_MARKER = '----stackblitz list----',
  DEFAULT_PATH_TO_REPO = '.';

/** Defines the type of the object returned by yargs */
export interface Config extends yargs.Arguments {
  prefix: string;
  pathToOutfile: string;
  marker: string;
  pathToRepo: string;
  githubRepo: string;
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
    .alias('o', 'pathToOutfile')
    .describe('o', 'path to file used to capture list of steps')
    .default('o', DEFAULT_OUTFILE)

    .string('m')
    .alias('m', 'marker')
    .describe('m', 'string used to indicate where output should be placed within the outfile')
    .default('m', DEFAULT_MARKER)

    .string('r')
    .alias('r', 'pathToRepo')
    .describe('r', 'The path to the target repo')
    .default('r', DEFAULT_PATH_TO_REPO)

    .string('u')
    .alias('u', 'githubRepo')
    .describe('u', 'The name of the upstream Github repository. ex: dpsthree/blitzify')
    .demandOption('u')

    .help()
    .argv as Config;
}
