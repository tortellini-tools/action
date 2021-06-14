# Developer documentation

This [action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action) is written in
[Typescript](https://www.typescriptlang.org)
and makes use of the
[Github @actions packages](https://github.com/actions/toolkit/blob/master/README.md#packages)

The underlining design can be found in [DESIGN.md](DESIGN.md).

## Requirements

This tool relies on the availability of [Node.js](https://nodejs.org/) and
[Docker](https://docs.docker.com/get-docker/).

Please verify that you have `Node.js` and the related package manager `npm`, and `docker` available on your
system. Make sure that the version of `Node.js` is at least `12`.

```bash
$ node --version
v14.17.0
$ npm --version
6.14.13
$ docker --version
Docker version 20.10.6, build 370c289
```

`Node.js` and `npm` can be downloaded in one package from [nodejs.org](https://nodejs.org/en/). And here are
[instructions for upgrading `Node.js`](https://phoenixnap.com/kb/update-node-js-version#ftoc-heading-3).

Install the dependencies

```bash
$ npm install
```

## Build

Build the typescript and package it for distribution

```bash
$ npm run build && npm run package
```

## Run unit test

The tests are stored in the directory `__tests__` and are written using
[jestjs](https://jestjs.io/).

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

To get information about the test coverage, run the tests with
`coverage npm test -- --coverage` and
examine the file `coverage/lcov-report/index.html`

## Linting

The code in the `src` directory can be linted with:

```bash
npm run lint
```

## Formatting

Some of the linting error can be fixed with formatting:

```bash
npm run format
```

## Run the analysis

### On the current repository

The tool will analyze the license dependencies in current Github
repository and store reports of the analyses in the `.tortellini/out/`
directory.

```shell
export INPUT_REPOSITORIES=
export INPUT_CURATIONS=''
export INPUT_CLASSIFICATIONS=https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/license-classifications.yml
export INPUT_RULES=https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/rules.kts
npm install
npm run build
npm run package
node dist/index.js
```

### On other repositories

You can also analyze other repositories on Github by storing their addresses in
a file and running node on the file, e.g.:

```shell
echo 'https://github.com/tortellini-tools/action' > urls.txt
echo 'https://github.com/fair-software/howfairis' >> urls.txt
```

The analysis expects a few environment variables. Here are their names and suggested values:

```
export INPUT_REPOSITORIES=urls.txt
export INPUT_CURATIONS=''
export INPUT_CLASSIFICATIONS=https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/license-classifications.yml
export INPUT_RULES=https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/rules.kts
sudo rm -r .tortellini
mkdir .tortellini
node dist/index.js
```

The analyses will be stored in the directories
`.tortellini/out/<owner>/<repository>/` .

## How to create a release

1. Update the citation metadata in `CITATION.cff`. Afterwards, follow the instructions from the `cffconvert` workfow to sync the information in `.zenodo.json` with that in `CITATION.cff`
1. Actions are run from GitHub repos so we need to generate the Javascript files in the `dist` folder and push the results:
    
    ```bash
    $ cd $(mktemp --directory --tmpdir tortellini-prep-release.XXXXXX)
    $ git clone https://github.com/tortellini-tools/action .
    $ npm install
    $ npm run all
    $ git add dist
    $ git commit --message "prod dependencies"
    $ git push origin main
    ```
1. Next, check if the top three actions on the [action page](https://github.com/tortellini-tools/action/actions?query=branch%3Amain+workflow%3Atortellini+event%3Apush) are green.
1. Create a release on the Github page via 
[Create a new release](https://github.com/tortellini-tools/action/releases/new).
1. On the new release page, for `Tag version` use `v` and the next version number, for example `v3`.
See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
for more information.

Your action is now published! :rocket:

Check if the new version has been published on the [Github Marketplace](https://github.com/marketplace/actions/tortellini-action).

You can now validate the action by going to 
[this workflow](https://github.com/tortellini-tools/action/actions/workflows/usage.yml)
and then clicking on the button `Run workflow`.
