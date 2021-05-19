import { Ortolan } from './ortolan'

const repositories = [
    {owner: 'iomega', repo: 'zenodo-upload'},
    {owner: 'xenon-middleware', repo: 'xenon-cli'}
]

for (const {owner, repo} of repositories) {
    const ortolan = new Ortolan(owner, repo)
    ortolan.run()
}

