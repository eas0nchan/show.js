import { createTransition } from '../src/index'
import './style.css'

const { enter, leave } = createTransition('fade-in')

const app = document.querySelector('#app')

const box = document.createElement('div')
box.className = 'box'
box.style.display = 'none'

const btn1 = document.createElement('button')
btn1.textContent = 'show'
btn1.className = 'btn'
btn1.addEventListener('click', () => {
  // enter(box, { onBeforeEnter: () => app.appendChild(box) })
  enter(box, { onBeforeEnter: () => (box.style.display = '') })
})

const btn2 = document.createElement('button')
btn2.textContent = 'hide'
btn2.className = 'btn'
btn2.addEventListener('click', () => {
  // leave(box, { onAfterLeave: () => app.removeChild(box) })
  leave(box, { onAfterLeave: () => (box.style.display = 'none') })
})

app.append(btn1, btn2, box)
