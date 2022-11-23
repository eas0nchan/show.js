export const stages = [
  'enter-from',
  'enter-active',
  'enter-to',
  'leave-from',
  'leave-active',
  'leave-to'
]

export function getStageKey(stage) {
  return stage.replace(/-([fat])/, (match, p) => p.toUpperCase()) + 'Class'
}

export function callHook(hooks, name) {
  if (typeof hooks?.[name] === 'function') hooks[name]()
}

export function createTransition(options) {
  let name = null
  let className = null
  if (typeof options === 'string') {
    name = options
    className = '[name]-[stage]'
  } else {
    name = options.name
    className = options.className ?? '[name]-[stage]'
  }

  const {
    enterFromClass,
    enterActiveClass,
    enterToClass,
    leaveFromClass,
    leaveActiveClass,
    leaveToClass
  } = classNameFormatter(name, className)

  function clearClass(el) {
    removeClass(
      el,
      enterFromClass,
      enterActiveClass,
      enterToClass,
      leaveFromClass,
      leaveActiveClass,
      leaveToClass
    )
  }

  function enter(el, hooks) {
    clearClass(el)
    function handleAfterEnter() {
      removeClass(el, enterActiveClass, enterToClass)
      el.removeEventListener('transitionend', handleAfterEnter)
      callHook(hooks, 'onAfterEnter')
    }
    el.addEventListener('transitionend', handleAfterEnter)
    callHook(hooks, 'onBeforeEnter')
    addClass(el, enterActiveClass, enterFromClass)
    nextFrame(() => {
      removeClass(el, enterFromClass)
      addClass(el, enterToClass)
      callHook(hooks, 'onEnter')
    })
  }

  function leave(el, hooks) {
    clearClass(el)
    function handleAfterLeave() {
      removeClass(el, leaveActiveClass, leaveToClass)
      el.removeEventListener('transitionend', handleAfterLeave)
      callHook(hooks, 'onAfterLeave')
    }
    el.addEventListener('transitionend', handleAfterLeave)
    callHook(hooks, 'onBeforeLeave')
    addClass(el, leaveActiveClass, leaveFromClass)
    nextFrame(() => {
      removeClass(el, leaveFromClass)
      addClass(el, leaveToClass)
      callHook(hooks, 'onLeave')
    })
  }

  return { enter, leave }
}

export function classNameFormatter(name, className = '[name]-[stage]') {
  const stageClassNames = {}
  if (typeof className === 'string') {
    stages.forEach(stage => {
      const replaceVals = { name, stage }
      const key = getStageKey(stage)
      stageClassNames[key] = className.replace(/\[(name|stage)\]/g, (match, p) => replaceVals[p])
    })
  } else {
    stages.forEach(stage => {
      const key = getStageKey(stage)
      stageClassNames[key] = className[key]
    })
  }
  return stageClassNames
}

function nextFrame(cb) {
  window.requestAnimationFrame ? window.requestAnimationFrame(cb) : setTimeout(cb, 16)
}

function addClass(el, ...classList) {
  el.classList.add(...classList)
}

function removeClass(el, ...classList) {
  el.classList.remove(...classList)
}
