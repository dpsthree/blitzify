import * as git from 'nodegit';

import { Config } from './config';
import { ParsedTag } from './types';

/**
 * Orchestrates the tasks needed for creation of link generation.
 *
 * Specifically createBlitzList will start the asynchronous process of fetching
 * git information and modifying the markdown file.
 * 
 * @param args the operational parameters, defaults already provided
 */
export function createBlitzList(args: Config): Promise<string[]> {

  // For now we are simply returning the promise to test this half of the process
  return git.Repository.open(args.pathToRepo)
    .then(filterTags(args.prefix))
    .then(processTags(args.prefix))
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
 * 
 * @param prefix target prefix used for filtering
 * @return a function that can be called to obtain the promise to a filtered list
 */
function filterTags(prefix: string): (repo: git.Repository) => Promise<string[]> {
  /**
   * @param repo target repo to look for tags, supplied by callback initiator
   */
  return function (repo: git.Repository) {
    return git.Tag.list(repo)
      .then(tagList => tagList.filter(tag => tag.indexOf(prefix) >= 0));
  };
}

/**
 * Transforms the tag list into a list of markdown compatible links
 * 
 * @param prefix target prefix used for splitting tag description
 * @return a function that can be called to obtain the results
 */
function processTags(prefix: string): (tagList: string[]) => Promise<string[]> {

  return function (tagList: string[]) {
    return tagList.map(tag => processOneTag(prefix, tag));
  }
}

/**
 * Parses the tag based on prefix, attempts to identify a step number,
 * and attempts to determine a human readable description
 * 
 * @param prefix string used to split the tag
 * @param tag target of transformation
 */
function processOneTag(prefix: string, tag: string): ParsedTag {
  // Strip the prefix;
  let tagRemainder = tag.slice(0, prefix.length - 1);

  let stepNumber = '';
  for (let i = 0; i < tagRemainder.length - 1; i++) {
    if (parseInt(tagRemainder[i], 10) !== NaN) {
      stepNumber += tagRemainder[i] + '';
    }
  }
}