"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const git = require("nodegit");
// tslint:disable-next-line:no-require-imports
const replace = require('replace-in-file');
const types_1 = require("./types");
// In order to prevent tag processing from becoming too hard
// coded the following information is used to help process the regular expression
const TAG_PORTION = '(\\d+)(_(.+))?';
const TAG_MAP = {
    number: 1,
    description: 3
};
const STACKBLITZ_URL = 'https://stackblitz.com/github';
/**
 * Orchestrates the tasks needed for creation of link generation.
 *
 * Specifically createBlitzList will start the asynchronous process of fetching
 * git information and modifying the markdown file.
 *
 * @param args the operational parameters, defaults already provided
 */
function createBlitzList(args) {
    const tagRegExp = new RegExp(`${args.prefix}${TAG_PORTION}`);
    // For now we are simply returning the promise to test this half of the process
    return git.Repository.open(args.pathToRepo)
        .then(filterTags(tagRegExp))
        .catch(err => {
        console.error(`Unabled to open repository at: ${args.pathToRepo}`, err);
        return [];
    })
        .then(processTags(args.prefix, tagRegExp, args.githubRepo))
        .then(links => links.join('\n'))
        .then(stringToWrite => {
        const options = {
            files: args.pathToOutfile,
            from: args.marker,
            to: stringToWrite
        };
        return replace(options)
            .catch((error) => console.error('unable to replace within file', error));
    });
}
exports.createBlitzList = createBlitzList;
/**
 * Creates filtered list of tags with which to generate links
 *
 * @param regEx target prefix used for filtering
 * @return a function that can be called to obtain the promise to a filtered list
 */
function filterTags(regEx) {
    /**
     * @param repo target repo to look for tags, supplied by callback initiator
     */
    return function (repo) {
        return git.Tag.list(repo)
            .then(tagList => tagList.filter(tag => regEx.exec(tag)));
    };
}
/**
 * Transforms the tag list into a list of markdown compatible links
 *
 * @param prefix target prefix used for splitting tag description
 * @param regEx: regEx used to match a tag
 * @param repo name of Github repo containing tag
 * @return a function that can be called to obtain the results
 */
function processTags(prefix, regEx, repo) {
    return function (tagList) {
        return tagList.map(tag => processOneTag(prefix, regEx, tag, repo));
    };
}
/**
 * Parses the tag based on regEx, attempts to identify a step number,
 * and attempts to determine a human readable description. Assumes
 * that filtering has already been performed upstream.
 *
 * @param prefix the prefix used to identify a tag candidate
 * @param regEx provides capturing groups for number and description
 * @param tag target of transformation, must match tag RegExp
 * @param repo name of Github repo containing tag
 * @return the markdown ready stackblitz url
 */
function processOneTag(prefix, regEx, tag, repo) {
    const results = regEx.exec(tag);
    const stepNumber = results[TAG_MAP.number];
    const description = results[TAG_MAP.description];
    return convertTagToUrl(new types_1.ParsedTag(tag, prefix, stepNumber, description), repo);
}
/**
 * Combines the pieces of the tag and the target repo to create
 * a markdown compatible string that is ready for insertion into the file
 *
 * @param parsedTag the tag to convert
 * @param repo name of Github repo containing tag
 */
function convertTagToUrl(parsedTag, repo) {
    const description = parsedTag.description ? ` - ${parsedTag.description}` : '';
    return `[${parsedTag.prefix}${parsedTag.stepNumber}${description}](${STACKBLITZ_URL}/${repo}/tree/${parsedTag.tag})
`;
}
//# sourceMappingURL=blitzify.js.map