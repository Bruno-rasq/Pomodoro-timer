const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')

const work_time = document.querySelector('#work_section_time')
const break_time = document.querySelector('#break_section_time')

const btn_time_controls = document.querySelectorAll('.btn-control')


const Debug = () => {
    console.log(work_time.value, break_time.value)

}


btn_time_controls.forEach((btn) => {
    btn.addEventListener('click', () => {

        if(btn.value === 'addtimework' && work_time.value < 30) work_time.value++
        if(btn.value === 'removetimework' && work_time.value > 0) work_time.value--
        if(btn.value === 'addtimebreak' && break_time.value < 10) break_time.value++
        if(btn.value === 'removetimebreak' && break_time.value > 0) break_time.value--

        
        Debug()
    })
})