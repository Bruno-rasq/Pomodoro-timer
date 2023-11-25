const title = document.querySelector('#title')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const audio = new Audio('/assets/audio.mp3')

const work_time = document.querySelector('#work_section_time')
const break_time = document.querySelector('#break_section_time')

const btn_time_controls = document.querySelectorAll('.btn-control')
const play = document.querySelector('#btn_play')
const pause = document.querySelector('#btn_pause')
const reset = document.querySelector('#btn_reset')

let loop;
let aux_minutes;
let aux_seconds;
let passingTime = false;
let workSEssion = false;





const setSec = (time) => {

    if(time < 10){
        seconds.innerHTML = `0${time}`
    } else {
        seconds.innerHTML = `${time}`
    }
}

const setMin = (time) => {

    if(time < 10){
        minutes.innerHTML = `0${time}`
    } else {
        minutes.innerHTML = `${time}`
    }
}

const StartTime = ( min = 0, sec = 0) => {

    title.innerHTML = 'Go! - work session'
    passingTime = true
    aux_minutes = min
    aux_seconds = sec

    loop = setInterval(() => {

        if(aux_seconds === 0){
            aux_seconds = 60
            aux_minutes--

            setMin(aux_minutes)
        }

        aux_seconds--
        setSec(aux_seconds)

        EndTime()

    }, 1000)
}

const EndTime = () => {

    if(aux_minutes === 0 && aux_seconds === 0){

        clearInterval(loop)
        passingTime = false

        title.innerHTML = 'End Time - work session'
        console.log('acabou o time')
        play.removeAttribute('disabled')

        audio.play()
        btn_time_controls.forEach((btn) => btn.removeAttribute("disabled"))
    } 
}

const playTime = () => {

    if(passingTime === false){

        btn_time_controls.forEach((btn) => btn.setAttribute("disabled", true))

        StartTime(work_time.value, aux_seconds)
        play.setAttribute('disabled', true)
        play.textContent = 'play'

    }
}

const pauseTime = () => {

    if(passingTime === true){
        
        clearInterval(loop)
        passingTime = false

        title.innerHTML = 'paused'
        play.removeAttribute('disabled')
        play.textContent = 'continue'

    }
}

const resetTime = () => {

    clearInterval(loop)
    passingTime = false

    work_time.value = 25
    aux_seconds = 0
    
    setMin(work_time.value)
    setSec(aux_seconds)

    play.removeAttribute('disabled')
    play.textContent = 'play'

    btn_time_controls.forEach((btn) => btn.removeAttribute("disabled"))
}




btn_time_controls.forEach((btn) => {
    btn.addEventListener('click', () => {

        if(btn.value === 'addtimework' && work_time.value < 30) work_time.value++
        if(btn.value === 'removetimework' && work_time.value > 1) work_time.value--
        if(btn.value === 'addtimebreak' && break_time.value < 10) break_time.value++
        if(btn.value === 'removetimebreak' && break_time.value > 1) break_time.value--

        setMin(work_time.value)
    })
})

play.addEventListener('click', playTime)

pause.addEventListener('click', pauseTime)

reset.addEventListener('click', resetTime)