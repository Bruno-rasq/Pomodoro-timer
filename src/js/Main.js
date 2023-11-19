const min = document.querySelector('#minutes')
const sec = document.querySelector('#seconds')

const timers__btn = document.querySelectorAll('.btns__timer__control  .btn')

const add__min__btn = document.querySelector('#add__minutes')
const remove__min__btn = document.querySelector('#remove__minutes')
const add__sec__btn = document.querySelector('#add__seconds')
const remove__sec__btn = document.querySelector('#remove__seconds')

const span__min = document.querySelector('.set-minutes > span')
const span__sec = document.querySelector('.set-seconds > span')



// controle do cronometro
timers__btn.forEach(key => {
    key.addEventListener('click', () => {
        console.log(key)
    })
})