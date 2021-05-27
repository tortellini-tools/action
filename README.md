<p align="center">
  <a href="https://github.com/tortellini-tools/action/actions"><img alt="typescript-action status" src="https://github.com/tortellini-tools/action/workflows/build-test/badge.svg"></a>
  <a href="https://github.com/tortellini-tools/action/actions"><img alt="tortellini-action status" src="https://github.com/tortellini-tools/action/workflows/tortellini/badge.svg"></a>
</p>

# Tortellini GitHub Action

This action checks dependency licence issues using [ort](https://github.com/oss-review-toolkit/ort).

<!-- ## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs -->

## Usage

See [action.yml](action.yml)

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
```

## Developer documentation

See [README.dev.md](README.dev.md)

## Disclaimer

`tortellini` aims at providing insights into the license depencies of your package based on available information on open source licenses. We hope this information is helpful. However, we are not lawyers and we do make mistakes. Therefore `tortellini` provides information on an "as-is" basis and does not make warranties regarding this information. For any questions regarding the issues related to the licenses in your code, please consult a professional.
