import * as git from 'nodegit';

import { Config } from './config';

/**
 * Orchestrates the tasks needed for creation of link generation.
 *
 * Specifically createBlitzList will start the asynchronous process of fetching
 * git information and modifying the markdown file.
 * @param args the operational parameters, defaults already provided
 */
export function createBlitzList(args: Config): Promise<string[]> {

  // For now we are simply returning the promise to test this half of the process
  return git.Repository.open(args.pathToRepo)
    .then(processTags(args))
    .catch(err => {
      console.error(`Unabled to open repository at: ${args.pathToRepo}`, err);
      return [];
    });
}

/**
 * Creates filtered list of tags with which to generate links
 *
 * TODO: Tag matching is currently case sensitive and prefix can match
 * any position in the tag.
 * @param repo the open repository to fetch the tags from
 * @return a function that can be called to obtain the promise to a filtered list
 */
function processTags(config: Config): (repo: git.Repository) => Promise<string[]> {
  return function (repo: git.Repository) {
    return git.Tag.list(repo)
      .then(tagList => tagList.filter(tag => tag.indexOf(config.prefix) >= 0));
  };
}
