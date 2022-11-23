import { expect, it } from 'vitest'
import { classNameFormatter } from '../show'

it('classNameFormatter', () => {
  const result = classNameFormatter('fade-in', '[name]__[stage]')
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
