# Design

This document describes the goal, requirements and plan of this project.

## Goal

Gain insight in potential problems regarding the licensing of software packages we develop at eScienceCenter

## Purpose

This tool should produce a report about the license compatibility for 1 or more pieces of software and their dependencies.

## Background

To use open source software, a license needs to be applied to it.
Most software have dependencies which themselves have licenses.
Not all licenses can be combined with each other.
It is often difficult to find out the licenses of the dependencies, and to gain insight into whether there are any conflicting licenses in use in a software package.

## Personas

At the Netherlands eScience Center (NLeSC) there is a need for more attention to licensing issues. Personas in the center are

-   program manager, someone accountable for software adhering to guidelines and best practices.
-   research software engineer, someone writing software

## User stories

### Does this project have software with license problems

As a program manager at NLeSC I would like have a tool that can find potential license problems in the software created in a project.

### Does my piece of software have potential license problems

As a research software engineer at NLeSC I would like to find out if my piece of software has any license violations.

## Theoretical steps

Regardless of whether we choose to use an existing tool/service or make something ourselves, the solution needs to have the following elements:

1. input is a list of URLs to our repositories on GitHub, e.g. from Research Software Directory
1. visit each, look in the root of the repository for a list of runtime (?) dependencies, for example from dependency files such as

    1. requirements.txt
    1. setup.cfg
    1. setup.py
    1. Pipfile
    1. Pipfile.lock
    1. pyproject.toml
    1. environment.yml
    1. yarn.lock
    1. package.json
    1. package-lock.json
    1. DESCRIPTION

    when repositories contain subdirectories with any of these dependency files, we need to do more nested/recursing evaluation

1. for each of the project dependencies,
    1. figure out whose copy is being used (e.g. PyPI, GitHub, crates.io, npm, maven, Anaconda cloud, bower, etc. more [here](https://en.wikipedia.org/wiki/List_of_software_package_management_systems#Application-level_package_managers))
    1. identify the license as stated on the platform whose copy we're using
1. yields a one-to-many graph (a tree) with relations ("If I have a GPL-3.0 here, can I have Apache-2.0 one level higher?")
1. figure out if there is any license of a dependency that yields a conflict with the top level license (should be Apache-2.0) (based on which rules?)
1. choose which result best represents the situation:
    1. didn't find a dependency file
    1. found a dependency file,
        1. every name was resolvable
            1. no conflicts
            1. had conflicts (with list of conflicts found)
        1. not every name was resolvable
            1. needs human evaluation

## High level implementation plan

After [evaluating existing tools](https://github.com/tortellini-tools/action/issues/2) we decided to wrap [ort](https://github.com/oss-review-toolkit/ort) in a script. As ort can detect licenses of dependences of a freshly cloned repository and produce a nice HTML report and machine readable reports. Ort is also widely used and supported by the OSS community.

1. Write a script to regularly
    - Clone the repository
    - For each repo generate a report using [ort](https://github.com/oss-review-toolkit/ort)
2. Define curation files
    - Start with some predefined curations
    - If users want to change or overwrite these curations they can
3. Add index page to list repos
    - Each repo should have a detailed report (html webapp)
4. Instructions for program managers and engineers
    - How to run analysis if you are a program manager
    - How to run analysis if you are an engineer
    - How to update curations

## Technical implementation details

The tool will be written as a GitHub action so it can be called in a GitHub workflow
The action has 2 modes:

### List of repos

This mode targets program managers.

Steps in a Github workflow:

1. Weekly scheduled (eg [fairtally-test](https://github.com/jmaassen/fairtally-test/blob/main/.github/workflows/fairtally.yml))
2. Action fetches repos from RSD
3. Use ort Docker image from https://hub.docker.com/r/philipssoftware/ort/
4. Run https://github.com/tortellini-tools/action/blob/rsd-software-vs-ort/ort/batch.sh, replace shell script with Typescript
5. Create `index-<timestamp>.json` with stats of all repos using Typescript
6. Create symlink/copy `index-<timestamp>.json` to index-latest.json
7. To S3 Upload index-latest.json, `index-<timestamp>.json` and for each repo
    - scan-report-web-app.html,
    - out.txt
    - evaluation-result.yml
8. Vue app index.html which shows index-latest.json in table
9. Upload files to S3, the S3 bucket can be visted with web browser

Steps 2 .. 8 could be captured in Github Actions like

```yaml
on:
    schedule:
        - cron: '0 0 * * 4' # Every thursday

    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:
jobs:
    tortellini:
        runs-on: ubuntu-latest
        steps:
            - name: Get the data dump from the RSD
              run: curl https://research-software.nl/api/software > software.json

            - name: Extract the list of URLs
              run: cat software.json | jq -r '[.[].repositoryURLs.github] | flatten | .[]' > urls.txt

            - name: Run ort on urls
              uses: tortellini-tools/action@v3
              with:
                  repositories: urls.txt
                  output-dir: results
                  curations: conf/curations.yml
                  rules: conf/rules.kts
                  classifications: conf/license-classifications.yml
            - uses: jakejarvis/s3-sync-action@master
              with:
                  args: --acl public-read --follow-symlinks
              env:
                  AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
                  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
                  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
                  AWS_REGION: 'us-west-1' # optional: defaults to us-east-1
                  SOURCE_DIR: 'results'
```

### Single repo

This mode targets engineers.

Using the GitHub Action for a single repo is very similar to using it for multiple repositories, but works on the currently checked out repository instead of on a list of URLs.

```yaml
on:
    release:
    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:
jobs:
    tortellini:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - name: Run ort on .
              uses: tortellini-tools/action@v3
            - uses: actions/upload-artifact@v2
              with:
                  name: tortellini-results
                  path: results/**
```

## Action structure

Action repo will have:

-   action.yml, GitHub Action definition file
-   src/index.ts which will clone repos, start ort container, save output to repos/<OWNER>/<REPO>, render index-latest.json
-   package.json with docker library
-   README/LICENSE

Repo in NLeSC org with ort default config files

Start repo from boilerplate <https://github.com/actions/typescript-action>
Use same repo as a test
