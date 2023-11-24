const title = document.querySelector('#title')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')

const work_time = document.querySelector('#work_section_time')
const break_time = document.querySelector('#break_section_time')

const btn_time_controls = document.querySelectorAll('.btn-control')
const play = document.querySelector('#btn_play')
const pause = document.querySelector('#btn_pause')

let aux_minutes;
let aux_seconds;
let passingTime = false;
let loop;



const Debug = () => {
    console.log(work_time.value, break_time.value)

}

const setMin = () => {
    if(work_time.value < 10){
        minutes.innerHTML = `0${work_time.value}`
    } else {
        minutes.innerHTML = `${work_time.value}`
    } 
}

const setSec = (time) => {

    if(time < 10){
        seconds.innerHTML = `0${time}`
    } else {
        seconds.innerHTML = `${time}`
    }
}

const displayMin = (time) => {

    if(time < 10){
        minutes.innerHTML = `0${time}`
    } else {
        minutes.innerHTML = `${time}`
    }
}

const StartTime = ( min = 0, sec = 0) => {

    title.innerHTML = 'Go!'
    passingTime = true
    aux_minutes = min
    aux_seconds = sec

    loop = setInterval(() => {

        if(aux_seconds === 0){
            aux_seconds = 60
            aux_minutes--

            displayMin(aux_minutes)
        }

        aux_seconds--
        setSec(aux_seconds)

        EndTime()

    }, 1000)
}

const EndTime = () => {

    if(aux_minutes === 0 && aux_seconds === 0){
        title.innerHTML = 'End Time'
        clearInterval(loop)
        passingTime = false
        console.log('acabou o time')
        play.removeAttribute('disabled')
    } 
}



btn_time_controls.forEach((btn) => {
    btn.addEventListener('click', () => {

        if(btn.value === 'addtimework' && work_time.value < 30) work_time.value++
        if(btn.value === 'removetimework' && work_time.value > 1) work_time.value--
        if(btn.value === 'addtimebreak' && break_time.value < 10) break_time.value++
        if(btn.value === 'removetimebreak' && break_time.value > 1) break_time.value--

        setMin()
        // Debug()
    })
})

play.addEventListener('click', () => {

    if(passingTime === false){

        StartTime(work_time.value, aux_seconds)
        play.setAttribute('disabled', true)

    } else {
        console.log('o tempo já está passando.')
    }
})

pause.addEventListener('click', () => {

    if(passingTime === true){
        
        title.innerHTML = 'paused'
        clearInterval(loop)
        play.removeAttribute('disabled')
        passingTime = false

    } else {
        console.log('o tempo já está parado.')
    }
})