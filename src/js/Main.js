"use strict"

const title = document.querySelector('#title')
const audio = new Audio('/assets/audio.mp3')

const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const work_time = document.querySelector('#work_section_time')
const break_time = document.querySelector('#break_section_time')

const btn_time_controls = document.querySelectorAll('.btn-control')
const play = document.querySelector('#btn_play')
const pause = document.querySelector('#btn_pause')
const reset = document.querySelector('#btn_reset')

let loop, 
    aux_minutes,
    aux_seconds

let passingTime = false,
    breaksession = false

let countBreaksession = 0;


const displayText = (text) => {
    title.innerHTML = text
}

const displayTime = (element, time) => {

    if(time < 10){
        element.innerHTML = `0${time}`
    } else {
        element.innerHTML = `${time}`
    }
}

const StartTime = ( min = 25, sec = 0) => {

    passingTime = true
    aux_minutes = min
    aux_seconds = sec

    loop = setInterval(() => {

        if(aux_seconds === 0){
            aux_seconds = 60
            aux_minutes--

            displayTime(minutes, aux_minutes)
        }

        aux_seconds--

        displayTime(seconds, aux_seconds)

        EndTime()

    }, 1000)
}

const EndTime = () => {

    if(aux_minutes === 0 && aux_seconds === 0){

        clearInterval(loop)
        passingTime = false

        displayText('End session')
        console.log('acabou o time')
        play.removeAttribute('disabled')

        audio.play()
        btn_time_controls.forEach((btn) => btn.removeAttribute("disabled"))

        setTimeout(()=> {

            breaksessionTime()

        }, 3000)
    
    }

}

const breaksessionTime = () => {

    displayText('break session')
    btn_time_controls.forEach((btn) => btn.removeAttribute("disabled"))
    if(countBreaksession === 4 && breaksession === false){

        StartTime(10)
        countBreaksession = 0

    } else if(breaksession === false){
        StartTime(break_time.value)
        breaksession = true
        countBreaksession++

    } else {
        resetTime()
    }
}

const playTime = () => {

    if(passingTime === false){

        passingTime = true
        btn_time_controls.forEach((btn) => btn.setAttribute("disabled", true))

        displayText('Go! - work session')
        StartTime(work_time.value, aux_seconds)
        play.setAttribute('disabled', true)
        play.textContent = 'play'
        play.classList.add('active')
        pause.classList.remove('active')
    }
}

// Bug na função pauseTime: timer se comportando estranho somente quandfo o pause é acionado.
const pauseTime = () => {

    if(passingTime === true){
        
        clearInterval(loop)
        passingTime = false

        displayText('paused')
        play.removeAttribute('disabled')
        play.textContent = 'continue'
        pause.classList.add('active')
        play.classList.remove('active')

    }
}

const resetTime = () => {

    clearInterval(loop)
    passingTime = false
    breaksession = false

    work_time.value = 25
    break_time.value = 5
    aux_seconds = 0
    
    displayTime(minutes, work_time.value)
    displayTime(seconds, aux_seconds)

    play.removeAttribute('disabled')
    play.textContent = 'play'
    displayText('Are you ready?')

    btn_time_controls.forEach((btn) => btn.removeAttribute("disabled"))
    pause.classList.remove('active')
    play.classList.remove('active')
}



btn_time_controls.forEach((btn) => {
    btn.addEventListener('click', () => {

        if(btn.value === 'addtimework' && work_time.value < 30) work_time.value++
        if(btn.value === 'removetimework' && work_time.value > 1) work_time.value--
        if(btn.value === 'addtimebreak' && break_time.value < 10) break_time.value++
        if(btn.value === 'removetimebreak' && break_time.value > 1) break_time.value--

        displayTime(minutes, work_time.value)
    })
})

play.addEventListener('click', playTime)

pause.addEventListener('click', pauseTime)

reset.addEventListener('click', resetTime)