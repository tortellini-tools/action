import { Ortolan } from '../src/ortolan'

test('can instantiate Ortolan', () => {
    const repos = [
        { owner: "myowner", repo: "myrepo" }
    ]
    const ortolan = new Ortolan(repos)
    expect(ortolan).toBeInstanceOf(Ortolan)
    expect(ortolan).toHaveProperty("repositories")
})
