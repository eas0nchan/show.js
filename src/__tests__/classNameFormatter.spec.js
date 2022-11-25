import { expect, it } from 'vitest'
import { classNameFormatter } from '../show'

it('classNameFormatter1', () => {
  const result = classNameFormatter('fade-in')
  expect(result).toMatchInlineSnapshot(`
    {
      "enterActiveClass": "fade-in-enter-active",
      "enterFromClass": "fade-in-enter-from",
      "enterToClass": "fade-in-enter-to",
      "leaveActiveClass": "fade-in-leave-active",
      "leaveFromClass": "fade-in-leave-from",
      "leaveToClass": "fade-in-leave-to",
    }
  `)
})

it('classNameFormatter2', () => {
  const result = classNameFormatter('fade-in__[stage]')
  expect(result).toMatchInlineSnapshot(`
    {
      "enterActiveClass": "fade-in__enter-active",
      "enterFromClass": "fade-in__enter-from",
      "enterToClass": "fade-in__enter-to",
      "leaveActiveClass": "fade-in__leave-active",
      "leaveFromClass": "fade-in__leave-from",
      "leaveToClass": "fade-in__leave-to",
    }
  `)
})
