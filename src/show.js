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

export function createTransition(name) {
  const {
    enterFromClass,
    enterActiveClass,
    enterToClass,
    leaveFromClass,
    leaveActiveClass,
    leaveToClass
  } = classNameFormatter(name)

  function enter(el, hooks) {
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

export function classNameFormatter(name) {
  const classNames = {}

  if (typeof name === 'string') {
    if (!/\[stage\]/.test(name)) name = `${name}-[stage]`
    stages.forEach(stage => {
      const key = getStageKey(stage)
      classNames[key] = name.replace(/\[stage\]/g, () => stage)
    })
  } else {
    stages.forEach(stage => {
      const key = getStageKey(stage)
      classNames[key] = name[key]
    })
  }

  return classNames
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
