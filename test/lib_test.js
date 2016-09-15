import { expect } from 'chai'
import {
  encode,
  decode
} from '../src/lib'

describe('encode', () => {
  it('returns the encoded id', () => {
    expect(encode(100871)).to.eq('Ao7')
  })
})

describe('decode', () => {
  it('returns the decoded id', () => {
    expect(decode('Ao7')).to.eq(100871)
  })
})
