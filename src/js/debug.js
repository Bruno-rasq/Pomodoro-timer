'use strict';

const title = document.querySelector('#title')
const audio = new Audio('/assets/audio.mp3')

// display timer
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')

// session duration display
const work_time = document.querySelector('#work_section_time')
const break_time = document.querySelector('#break_section_time')

const btn_time_controls = document.querySelectorAll('.btn-control')
const play = document.querySelector('#btn_play')
const pause = document.querySelector('#btn_pause')
const reset = document.querySelector('#btn_reset')


// variaveis auxiliares
let workMinutes = 25, 
    breakMinutes = 5,
    aux_minutes = 0, 
    aux_seconds = 0, 
    count_break_sessions = 0,
    Time_passing = false

let Time_loop; 

let workSession = false, breakSession = false


const DeBug = () => {
    const debug = [
        `workMinutes: ${workMinutes}`,
        `BreakMinutes: ${breakMinutes}`,
        `auxMin: ${aux_minutes}`,
        `auxSec: ${aux_seconds}`,
        `Count_BS: ${count_break_sessions}`,
        `Time_passing: ${Time_passing}`,
        `WorkSession: ${workSession}`,
        `BreakSession: ${breakSession}`
    ]
    
    console.log(debug.join('\n'))
}

const sessionDuration = ( element, value ) => {
    element.innerHTML = `${value} min`
}

const displayTimer = ( element, time ) => {

    if(time < 10){
        element.innerHTML = `0${time}`
    } else {
        element.innerHTML = `${time}`
    }
}

const Reset = () => {

    count_break_sessions = 0
    aux_seconds = 0
    aux_minutes = 0
    workMinutes = 25
    breakMinutes = 5
    Time_passing = false
    workSession = false
    breakSession = false

    sessionDuration(work_time, workMinutes)
    sessionDuration(break_time, breakMinutes)
    displayTimer(minutes, workMinutes)
    displayTimer(seconds, aux_seconds)

    clearInterval(Time_loop)

    DeBug()
}


const Play = () => {

    if(!workSession) {
        
        WorkTimer(workMinutes)

    } else if( workSession && !breakSession){

        BreakTimer(breakMinutes)
    }

    // DeBug()
}

const Pause = () => {

    if(Time_passing === true){

        console.log('pausado')
        clearInterval(Time_loop)
        Time_passing = false
    }

    // DeBug()
}

const EndTime = () => {

    if(aux_minutes === 0 && aux_seconds === 0){

        audio.play()
        console.log('acabou o tempo')

        clearInterval(Time_loop)
        Time_passing = false

        if(workSession === false){

            workSession = true
            AutoPlay()

        } else if(workSession && breakSession === false){

            breakSession = true
            AutoPlay()

        }else if(workSession && breakSession){
            
            Reset()
        } 
    }
}

const WorkTimer = ( time ) => {

    console.log('iniciando cronometro')
    
    if(Time_passing === false){

        Time_passing = true
        aux_minutes = time
        
        Time_loop = setInterval(() => {

            if(aux_seconds === 0){

                workMinutes--
                aux_minutes--
                aux_seconds = 60

                displayTimer(minutes, aux_minutes)
            }

            aux_seconds--

            displayTimer(seconds, aux_seconds)

            EndTime()

        }, 1000)
    }
}

const BreakTimer = ( time ) => {

    console.log('iniciando intervalo')
    
    if(Time_passing === false){

        Time_passing = true
        aux_minutes = time
        
        Time_loop = setInterval(() => {

            if(aux_seconds === 0){

                breakMinutes--
                aux_minutes--
                aux_seconds = 60

                displayTimer(minutes, aux_minutes)
            }

            aux_seconds--

            displayTimer(seconds, aux_seconds)

            EndTime()

        }, 1000)
    }
}

const AutoPlay = () => {

    setTimeout(() => {
        Play()
    }, 3000)
}


window.onload = () => {

    Reset()
}

btn_time_controls.forEach((btn) => {
    btn.onclick = () => {

        if(btn.value === 'addtimework' && workMinutes < 30) workMinutes++
        if(btn.value === 'removetimework' && workMinutes > 1) workMinutes--
        if(btn.value === 'addtimebreak' && breakMinutes < 10) breakMinutes++
        if(btn.value === 'removetimebreak' && breakMinutes > 1) breakMinutes--

        displayTimer(minutes, workMinutes)
        sessionDuration(work_time, workMinutes)
        sessionDuration(break_time, breakMinutes)

        // DeBug()
    }
})

play.addEventListener('click', Play)

reset.addEventListener('click', Reset)

pause.addEventListener('click', Pause)