<p align="center">
  <a href="https://github.com/tortellini-tools/action/actions"><img alt="typescript-action status" src="https://github.com/tortellini-tools/action/workflows/build-test/badge.svg"></a>
  <a href="https://github.com/tortellini-tools/action/actions"><img alt="linting-action status" src="https://github.com/tortellini-tools/action/workflows/linting/badge.svg"></a>
  <a href="https://github.com/tortellini-tools/action/actions/workflows/usage-current-repository.yml"><img alt="tortellini-action status" src="https://github.com/tortellini-tools/action/actions/workflows/usage-current-repository.yml/badge.svg"></a>
  <a href="https://github.com/tortellini-tools/action/actions/workflows/usage-multiple-repositories.yml"><img alt="tortellini-action status" src="https://github.com/tortellini-tools/action/actions/workflows/usage-multiple-repositories.yml/badge.svg"></a>
  <a href="https://doi.org/10.5281/zenodo.4956072"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.4956072.svg" alt="DOI"></a>
  <a href="https://www.research-software.nl/software/tortellini-github-action">
  <img src="https://img.shields.io/badge/rsd-tortellini-00a3e3.svg" alt="Research Software Directory"></a>
</p>

# Tortellini GitHub Action

This action checks dependency license issues using [ort](https://github.com/oss-review-toolkit/ort).

This GitHub action can
* Run license analysis on your repository
* Run license analysis on list of repositories given
* Detect licensing violations
* Summarize potential licensing issues
* Generate a report with summary

## Inputs

### `repositories`

A file containing list of GitHub repository urls. Format is a single url (`https://github.com/<owner>/<repo>`) on each line. If set then action will run check on each url and generate an overview HTML page.
If not set the action runs check on currently checked out repository (`.` directory).
By default the `repositories` input is not set.

### `rules`

**Required** A file or URL containing [ort rules](https://github.com/oss-review-toolkit/ort/blob/master/docs/file-rules-kts.md) to detect license violations. Default is [https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/rules.kts](https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/rules.kts).

### `classifications`

**Required** A file or URL containing classes for each license. For format see [ort documentation](https://github.com/oss-review-toolkit/ort/blob/master/docs/config-file-license-classifications-yml.md). Default is [https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/license-classifications.yml](https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/license-classifications.yml).

### `curations`

A file or URL containing curations correct invalid or missing package metadata and set the concluded license for packages. See [ort documentation](https://github.com/oss-review-toolkit/ort/blob/master/docs/config-file-curations-yml.md) for format. If not set then action will not use any curations.

## Outputs

No action outputs are defined for this actions.
The action will write files to `.tortellini/out/` directory.

## Usage

### Own repository

```yaml
on:
    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:

jobs:
    tortellini:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: tortellini-tools/action@v3
            - uses: actions/upload-artifact@v2
              with:
                  name: tortellini-result
                  path: .tortellini/out
```

Tortellini action will generate `.tortellini/out/scan-report-web-app.html` file.
The HTML file can be downloaded from the workflow page (see the documentation of the [`Upload a Build Artifact` GitHub action](https://github.com/actions/upload-artifact#where-does-the-upload-go)). After unzipping the `scan-report-web-app.html` can be viewed in a web browser.

### Multiple repositories

```yaml
on:
    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:

jobs:
    tortellini:
        runs-on: ubuntu-latest
        steps:
            - name: Create list of GitHub urls to perform check on
              run: |
                  echo 'https://github.com/tortellini-tools/action' > urls.txt
                  echo 'https://github.com/fair-software/howfairis' >> urls.txt
            - uses: tortellini-tools/action@v3
              with:
                  repositories: urls.txt
            - uses: actions/upload-artifact@v2
              with:
                  name: tortellini-results
                  path: .tortellini/out
```

Tortellini action will generate `.tortellini/out/index.html` file and `.tortellini/out/<GitHub user or organization>/<GitHub repository>/scan-report-web-app.html` files.

The HTML files can be downloaded from the workflow page (see the documentation of the [`Upload a Build Artifact` GitHub action](https://github.com/actions/upload-artifact#where-does-the-upload-go)). After unzipping the `index.html` can be viewed in a web browser.

## Developer documentation

See [README.dev.md](README.dev.md)

## Disclaimer

`tortellini` aims at providing insights into the license depencies of your package based on available information on open source licenses. We hope this information is helpful. However, we are not lawyers and we do make mistakes. Therefore `tortellini` provides information on an "as-is" basis and does not make warranties regarding this information. For any questions regarding the issues related to the licenses in your code, please consult a professional.
