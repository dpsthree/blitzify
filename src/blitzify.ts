import * as git from 'nodegit';

import { Config } from './config';

export function createBlitzList(args: Config): Promise<void> {
  return git.Repository.open(args.pathToRepo)
    .then(repo => {
      return git.Tag.list(repo)
        .then(tagList => {
          console.log('tagList', tagList);
        });
    });
}
