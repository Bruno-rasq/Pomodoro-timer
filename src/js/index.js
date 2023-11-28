'use strict';

const Body = document.querySelector('#body')
const Main = document.querySelector('#main')

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
    count_break_sessions = 1,
    Time_passing = false, 
    workSession = false, 
    breakSession = false;

let Time_loop; 



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

const UpdateTitle = ( text ) => {
    title.innerHTML = text
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

    UpdateTitle('Are you ready?')

    play.removeAttribute('disabled')
    pause.removeAttribute('disabled')
    play.innerHTML = 'Play'
    play.classList.remove('active')
    pause.classList.remove('active')

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
    btn_time_controls.forEach((btn) => btn.removeAttribute("disabled"))

    // DeBug()
}

const Play = () => {

    play.setAttribute('disabled', true)
    play.innerHTML = 'Play'
    play.classList.add('active')
    pause.classList.remove('active')
    pause.removeAttribute('disabled')

    if(!workSession) {
        
        UpdateTitle('Work session')
        WorkTimer(workMinutes)
        btn_time_controls.forEach((btn) => btn.setAttribute("disabled", true))

    } else if( workSession && !breakSession){

        UpdateTitle(`Break Session ${count_break_sessions}`)
        btn_time_controls.forEach((btn) => btn.setAttribute("disabled", true))

        if(count_break_sessions >= 4){

            BreakTimer(10)
            count_break_sessions = 0

        } else {

            BreakTimer(breakMinutes)
            count_break_sessions++
        }

    } else {
        Reset()
    }
    // DeBug()
}

const Pause = () => {

    if(Time_passing === true){

        play.removeAttribute('disabled')
        pause.setAttribute('disabled', true)
        play.innerHTML = 'Continue'
        pause.classList.add('active')
        play.classList.remove('active')

        UpdateTitle('paused')
        clearInterval(Time_loop)
        Time_passing = false
    }

    // DeBug()
}

const EndTime = () => {

    if(aux_minutes === 0 && aux_seconds === 0){

        audio.play()
        UpdateTitle('End Session')

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



// iniciando app
const startApp = () => {

    setTimeout(() => {
        body.removeChild(loadCard)
        main.style.display = 'flex'
        Reset()
    }, 4000)
}

// auxiliar na criação de elemento
const CreateElement = (tag, classe) => {
    const element = document.createElement(tag)
    element.className = classe
    return element
}

//criando elemento de loading
const CreateLoading = () => {
    
    const load = CreateElement('div', 'load')
    const title = CreateElement('h1', 'title')
    const loading = CreateElement('div', 'loading')
    const span1 = CreateElement('span')
    const span2 = CreateElement('span')
    const span3 = CreateElement('span')

    title.innerHTML = 'Pomodoro Timer | App'
    span1.innerHTML = '.'
    span2.innerHTML = '.'
    span3.innerHTML = '.'

    loading.appendChild(span1)
    loading.appendChild(span2)
    loading.appendChild(span3)
    load.appendChild(title)
    load.appendChild(loading)

    return load
}

const loadCard = CreateLoading()




window.onload = () => {

    Body.appendChild(loadCard)
    startApp()
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