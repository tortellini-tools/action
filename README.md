# licenseguard

This is a repository that will eventually have a tool which will check the dependency licenses.
At NLeSC there is need of more attention to the licensing issues. It is often difficult to find out the first order licenses of the dependencies and conflicts. 
Find the software not following the requirements from NLeSC.
A tool program manager (or person X) can use to check the issues. The tool automatically check these issues and point to some guides.

## Features of the intended tool

See [requirements.md](requirements.md)

## Out of scope

- 2nd order dependencies
- Automatically fixing license conflicts

## Follow up

- point to (Turing Way/NLeSC guide) in case of issues
- suggest user to contact to that can help determine severity and/or resolve conflict

## Implementation plan

1. Write a Python scripts to regularly
    - Clone the repository under `repos/OWNER/REPO`
    - For each repo generate a report
2. Define curation files
    - Start with some predefined curations
    - If users want to change or overwrite these curations they can add them to a folder/file which will be discovered by the tool
3. Add index page to list repos
    - remove high order dependencies (see [here](https://github.com/NLeSC/licenseguard/issues/13#issuecomment-834514303) and [here](https://github.com/oss-review-toolkit/ort/blob/e5b135df72f809563296912f99c59149571279a6/docs/config-file-ort-yml.md#excluding-paths))
    - Each repo should have a detailed report (html webapp)
4. Instructions for program managers and engineers
    - How to run analysis if you are a program manager
    - How to run analysis if you are an engineer
    - How to update curations



1. Github action which performs analysis

    2. Weekly scheduled (eg [fairtally-test](https://github.com/jmaassen/fairtally-test/blob/main/.github/workflows/fairtally.yml))
    3. Action fetches repos from RSD
    4. Use ort Docker image from https://hub.docker.com/r/philipssoftware/ort/
    5. Run https://github.com/NLeSC/licenseguard/blob/rsd-software-vs-ort/ort/run.sh
    6. Create index-<timestamp>.json with stats per repo
    7. Create symlink index-latest.json of index-<timestamp>.json
    8. Upload Vue app index.html which shows index-latest.json in table (can be done once)
3. uploads html/json of each repo to S3
4. Create timestamped index.html for every run and archives them to S3
5. Create link to latest index.html
6. S3 bucket can be visted with web browser

