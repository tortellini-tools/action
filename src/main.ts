import {Ortolan} from './ortolan'

const repositories = [
    {owner: 'iomega', repo: 'zenodo-upload'},
    {owner: 'xenon-middleware', repo: 'xenon-cli'}
]

const ortolan = new Ortolan(repositories)
ortolan.run('list-of-repositories')
