<p align="center">
  <a href="https://github.com/tortellini-tools/action/actions"><img alt="typescript-action status" src="https://github.com/tortellini-tools/action/workflows/build-test/badge.svg"></a>
  <a href="https://github.com/tortellini-tools/action/actions"><img alt="linting-action status" src="https://github.com/tortellini-tools/action/workflows/linting/badge.svg"></a>
  <a href="https://github.com/tortellini-tools/action/actions/workflows/usage.yml"><img alt="tortellini-action status" src="https://github.com/tortellini-tools/action/actions/workflows/usage.yml/badge.svg"></a>
</p>

# Tortellini GitHub Action

This action checks dependency license issues using [ort](https://github.com/oss-review-toolkit/ort).

<!-- ## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs -->

## Usage

See [action.yml](action.yml)

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
            - uses: tortellini-tools/action@main
            - uses: actions/upload-artifact@v2
              with:
                  name: tortellini-results
                  path: .tortellini/out
```

Tortellini action will generate `.tortellini/out/scan-report-web-app.html` file.
The HTML file can be downloaded from the [workflow page](https://github.com/actions/upload-artifact#where-does-the-upload-go) by using the GitHubs upload-artifact action.

### Multiple repositories

```yaml
on:
    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:

jobs:
    tortellini:
        runs-on: ubuntu-latest
        steps:
            - run: |
                  echo 'https://github.com/tortellini-tools/action' > urls.txt
                  echo 'https://github.com/fair-software/howfairis' >> urls.txt
            - uses: tortellini-tools/action@main
              with:
                  repositories: urls.txt
            - uses: actions/upload-artifact@v2
              with:
                  name: tortellini-results
                  path: .tortellini/out
```

Tortellini action will generate `.tortellini/out/index.html` file and `.tortellini/out/<GitHub user or organization>/<GitHub repository>/scan-report-web-app.html` files.
The HTML files can be downloaded from [your workflow page](https://github.com/actions/upload-artifact#where-does-the-upload-go) by using GitHubs upload-artifact action.

To view the HTML files directly you could upload the `.tortellini/out` folder to a web server like an AWS S3 bucket.

## Developer documentation

See [README.dev.md](README.dev.md)

## Disclaimer

`tortellini` aims at providing insights into the license depencies of your package based on available information on open source licenses. We hope this information is helpful. However, we are not lawyers and we do make mistakes. Therefore `tortellini` provides information on an "as-is" basis and does not make warranties regarding this information. For any questions regarding the issues related to the licenses in your code, please consult a professional.
