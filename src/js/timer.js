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

let aux1 = 25, 
    aux2 = 5

let loop, 
    aux_minutes,
    aux_seconds = 0

let passingTime = false,
    breaksession = false

let countBreaksession = 0



const displayTime = ( element, time ) => {

    if(time < 10){
        element.innerHTML = `0${time}`
    } else {
        element.innerHTML = `${time}`
    }
}

const sessionDuration = ( element, value ) => {
    element.innerHTML = `${value} min`
}

const displayText = ( text ) => {
    title.innerHTML = text
}

const StartTime = ( min = 25, sec = 0 ) => {

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
        audio.play()

        passingTime = false
        displayText('End session')
        play.removeAttribute('disabled')


        setTimeout(()=> {

            breaksessionTime()

        }, 3000)
    }
}

const breaksessionTime = () => {

    displayText('Break session')
    passingTime = true

    if(countBreaksession === 4 && breaksession === false){

        displayText('Break session bônus')
        StartTime(10)
        countBreaksession = 0
        breaksession = true

    } else if(breaksession === false){

        StartTime(aux2)
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

        displayText('Work session')
        StartTime(aux1, aux_seconds)

        play.setAttribute('disabled', true)
        play.textContent = 'play'
        play.classList.add('active')
        pause.classList.remove('active')
    }
}

const pauseTime = () => {

    if(passingTime === true){
        
        clearInterval(loop)
        displayText('paused')
        passingTime = false

        play.removeAttribute('disabled')
        play.textContent = 'continue'
        play.classList.remove('active')
        pause.classList.add('active')
    }
}

const resetTime = () => {

    clearInterval(loop)

    passingTime = false
    breaksession = false
    aux1 = 25
    aux2 = 5
    aux_seconds = 0
    aux_minutes = 0

    displayText('Are you ready?')
    sessionDuration( work_time, aux1)
    sessionDuration( break_time, aux2)
    displayTime(minutes, aux1)
    displayTime(seconds, aux_seconds)

    play.removeAttribute('disabled')
    play.textContent = 'play'
    play.classList.remove('active')
    pause.classList.remove('active')

    btn_time_controls.forEach((btn) => btn.removeAttribute("disabled"))
}



window.onload = () => {

    sessionDuration(work_time, aux1)
    sessionDuration(break_time, aux2)
    displayTime(minutes, aux1)
}

btn_time_controls.forEach((btn) => {
    btn.addEventListener('click', () => {

        if(btn.value === 'addtimework' && aux1 < 30) aux1++
        if(btn.value === 'removetimework' && aux1 > 1) aux1--
        if(btn.value === 'addtimebreak' && aux2 < 10) aux2++
        if(btn.value === 'removetimebreak' && aux2 > 1) aux2--

        displayTime(minutes, aux1)
        sessionDuration( work_time, aux1)
        sessionDuration( break_time, aux2)
        
    })
})

play.addEventListener('click', playTime)

pause.addEventListener('click', pauseTime)

reset.addEventListener('click', resetTime)