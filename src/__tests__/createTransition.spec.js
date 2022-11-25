import { expect, it } from 'vitest'
import { createTransition } from '../show'

it('createTransition', () => {
  const result = createTransition('fade-in')
  expect(result).toMatchInlineSnapshot(`
    {
      "enter": [Function],
      "leave": [Function],
    }
  `)
})
