import { expect, it } from 'vitest'
import { createTransition } from '../show'

it('createTransition-1', () => {
  const result = createTransition('fade-in')
  expect(result).toMatchInlineSnapshot(`
    {
      "enter": [Function],
      "leave": [Function],
    }
  `)
})

it('createTransition-2', () => {
  const result = createTransition({ name: 'fade-in', className: '[name]__[stage]' })
  expect(result).toMatchInlineSnapshot(`
    {
      "enter": [Function],
      "leave": [Function],
    }
  `)
})
