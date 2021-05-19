import { Ortolan } from '../src/ortolan'

test('can instantiate Ortolan', () => {
    const ortolan = new Ortolan("myowner", "myrepo")
    expect(ortolan).toBeInstanceOf(Ortolan)
    expect(ortolan).toHaveProperty("owner")
    expect(ortolan).toHaveProperty("repo")
})
