import * as git from 'nodegit';

import { Config } from './config';

export function createBlitzList(args: Config): Promise<void> {
  return git.Repository.open(args.pathToRepo)
    .then(processTags)
    .catch(err => console.error(`Unabled to open repository at: ${args.pathToRepo}`, err));
}

function processTags(repo: git.Repository) {
  return git.Tag.list(repo)
    .then(tagList => {
      console.log('tagList', tagList);
    });
}
