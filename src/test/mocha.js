'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const assert_1 = __importDefault(require('assert'))
describe('Simple test example', () => {
    it('should find the correct name', () => {
        const name = 'Yassin';
        (0, assert_1.default)(typeof name === 'string', 'you don\'t know ts, do you?')
    })
})
//# sourceMappingURL=mocha.js.map