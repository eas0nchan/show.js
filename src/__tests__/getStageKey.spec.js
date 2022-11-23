import { expect, it } from 'vitest'
import { stages, getStageKey } from '../show'

it('getStageKey', () => {
  const result = stages.map(stage => getStageKey(stage))
  expect(result).toMatchInlineSnapshot(`
    [
      "enterFromClass",
      "enterActiveClass",
      "enterToClass",
      "leaveFromClass",
      "leaveActiveClass",
      "leaveToClass",
    ]
  `)
})
