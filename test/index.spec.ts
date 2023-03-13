import assert from 'assert'
describe('Simple test example', () => {
    it('should find the correct name', () => {
        const name = 'Yassin'
        assert(typeof name === 'string', 'you don\'t know ts, do you?')
    })
})