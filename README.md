<p align="center">
  <a href="https://github.com/tortellini-tools/action/actions"><img alt="typescript-action status" src="https://github.com/tortellini-tools/action/workflows/build-test/badge.svg"></a>
  <a href="https://github.com/tortellini-tools/action/actions"><img alt="linting-action status" src="https://github.com/tortellini-tools/action/workflows/linting/badge.svg"></a>  
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
      with:
        curations: .tortelllin/curations.yml or https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/curations.yml
        rules: https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/rules.kts
        classifications: https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/license-classifications.yml
```

### Multiple repositories
```yaml
on:
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  tortellini:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - run: |
        echo 'https://github.com/tortellini-tools/action' > urls.txt
        echo 'https://github.com/fair-software/howfairis' >> urls.txt
    - uses: tortellini-tools/action@main
      with:
        repositories: 'urls.txt'
        rules: https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/rules.kts
        classifications: https://github.com/NLeSC/tortellini-on-rsd/raw/main/config/license-classifications.yml
```

## Developer documentation

See [README.dev.md](README.dev.md)

## Disclaimer

`tortellini` aims at providing insights into the license depencies of your package based on available information on open source licenses. We hope this information is helpful. However, we are not lawyers and we do make mistakes. Therefore `tortellini` provides information on an "as-is" basis and does not make warranties regarding this information. For any questions regarding the issues related to the licenses in your code, please consult a professional.
