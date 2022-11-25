import { createTransition } from '../src/index'
import './style.css'

const fadeIn1 = createTransition('fade-in')
const fadeIn2 = createTransition('fade-in__[stage]')

const app = document.querySelector('#app')

const btn1 = document.createElement('button')
btn1.textContent = 'show'
btn1.className = 'btn'
const btn2 = document.createElement('button')
btn2.textContent = 'hide'
btn2.className = 'btn'

const btn3 = document.createElement('button')
btn3.textContent = 'mount'
btn3.className = 'btn'
btn3.style.backgroundColor = '#f56c6c'
const btn4 = document.createElement('button')
btn4.textContent = 'remove'
btn4.className = 'btn'
btn4.style.backgroundColor = '#f56c6c'

const box1 = document.createElement('div')
box1.className = 'box'
box1.style.display = 'none'

const box2 = document.createElement('div')
box2.className = 'box'
box2.style.backgroundColor = '#f56c6c'

app.append(btn1, btn2, btn3, btn4, box1)

// show
btn1.addEventListener('click', () => {
  fadeIn1.enter(box1, { onBeforeEnter: () => (box1.style.display = '') })
})
// hide
btn2.addEventListener('click', () => {
  fadeIn1.leave(box1, { onAfterLeave: () => (box1.style.display = 'none') })
})

// mount
btn3.addEventListener('click', () => {
  fadeIn2.enter(box2, { onBeforeEnter: () => app.appendChild(box2) })
})
// remove
btn4.addEventListener('click', () => {
  fadeIn2.leave(box2, { onAfterLeave: () => app.removeChild(box2) })
})
