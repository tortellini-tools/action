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

## Technical implementation details

1. Github action which performs analysis

    2. Weekly scheduled (eg [fairtally-test](https://github.com/jmaassen/fairtally-test/blob/main/.github/workflows/fairtally.yml))
    3. Action fetches repos from RSD
    4. Use ort Docker image from https://hub.docker.com/r/philipssoftware/ort/
    5. Run https://github.com/NLeSC/licenseguard/blob/rsd-software-vs-ort/ort/batch.sh, replace shell script with Typescript
    6. Create `index-<timestamp>.json` with stats of all repos using Typescript
    7. Create symlink/copy `index-<timestamp>.json` to index-latest.json
    8. To S3 Upload index-latest.json, `index-<timestamp>.json` and for each repo
        - scan-report-web-app.html, 
        - out.txt
        - evaluation-result.yml
    9. Vue app index.html which shows index-latest.json in table, file should be uploaded S3

Steps 44 .. 51 could be captured in Github Actions like

```
on:  
  schedule:   
    - cron: "0 0 * * 4"  # Every thursday

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
jobs:
  batchort:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Get the data dump from the RSD
        run: curl https://research-software.nl/api/software > software.json

      - name: Extract the list of URLs 
        run: cat software.json | jq -r '[.[].repositoryURLs.github] | flatten | .[]' > urls.txt
        
      - name: Run ort on urls
        uses: NLeSC/batchort@v1
        with:
           repositories: urls.txt
           outputdir: results
           package-curation-file: conf/curations.yml
           rules-file: conf/rules.kts
           license-classifications-file: conf/license-classifications.yml
           report-formats:
             - WebApp
             - stdout
             - evaluation-result
           only-first-order-deps: True
    - uses: jakejarvis/s3-sync-action@master
      with:
        args: --acl public-read --follow-symlinks
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'us-west-1'   # optional: defaults to us-east-1
        SOURCE_DIR: 'results' 
     # Or
    - uses: actions/upload-artifact@v2
      with:
        name: batchort-results
        path: results/**
```


6. S3 bucket can be visted with web browser

Repo will have:

- conf/,  with ort default config files
- action.yml, ACtion def file
- src/index.ts which will clone repos, start ort container, save output to repos/<OWNER>/<REPO>, render index-latest.json
- package.json with docker library
- README/LICENSE

Start repo from boilerplate https://github.com/actions/typescript-action
Use same repo as a test

    
    
    
## Notes from Sprint planning meeting
    
- A single GitHub action for both engineers and program managers
repo:NAME/action (GitHub Action)
- has NLeSC specific default ort config files
- For checked out repo only (default)
- If a list of urls are given run for these urls (this is for program managers)
- Write a documentation to give examples

- Workflow example for engineers to use in their repos
repo:NAME/example-workflow (workflow)

- Workflow for program managers (to check RSD)
- Overview of the analysis that includes results form each repo in urllist
repo:NLeSC/NAME-batch-rsd (workflow)
on:scheduled
creates list of repos from RSD API
runs ortolan-tools/action action with list of repos
uploads the results to S3



Demonstrate a workflow that will take configurable urls from RSD and generate analysis yml file.

Sprint 2
- https://github.com/NLeSC/licenseguard/milestone/1
- https://github.com/NLeSC/licenseguard/milestone/2    
    
Sprint 3
- https://github.com/NLeSC/licenseguard/milestone/3
- https://github.com/NLeSC/licenseguard/milestone/4
- https://github.com/NLeSC/licenseguard/milestone/5
