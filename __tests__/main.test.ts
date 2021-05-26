import { Tortellini } from '../src/tortellini'

test('can instantiate Tortellini', () => {
    const repos = [
        { owner: "myowner", repo: "myrepo" }
    ]
    const tortellini = new Tortellini(repos)
    expect(tortellini).toBeInstanceOf(Tortellini)
    expect(tortellini).toHaveProperty("repositories")
})
