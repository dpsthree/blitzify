import * as git from 'nodegit';
import { Config } from './config';

export function createBlitzList(_args: Config): Promise<void> {
  return git.Repository.open('.')
    .then(repo => {
      return git.Tag.list(repo)
        .then(tagList => {
          console.log('tagList', tagList);
        });
    });
}
