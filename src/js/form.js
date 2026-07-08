const nextBtns = document.querySelectorAll('.next-btn')
const progressSteps = document.querySelectorAll('.progress-step')
const progress = document.querySelector('.progress')
const prevBtns = document.querySelectorAll('.prev-btn')
const formSteps = document.querySelectorAll('.form-step')

let currentStep = 0

nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener('click', () => {
        currentStep++
        updateProgress()
        updateForm()
    })
})

prevBtns.forEach((prevBtn) => {
    prevBtn.addEventListener('click', () => {
        currentStep--
        updateProgress()
        updateForm()
    })
})

function updateProgress() {
    progressSteps.forEach((progressStep, index) => {
        if (index < currentStep + 1) {
            progressStep.classList.add('step-active')
        } else {
            progressStep.classList.remove('step-active')
        }
    })
    const activeSteps = document.querySelectorAll('.step-active')
    progress.style.width = ((activeSteps.length - 1) / (progressSteps.length - 1)) * 100 + '%'
}

function updateForm() {
    formSteps.forEach((form) => {
        form.classList.remove('form-active')
    })
    formSteps[currentStep].classList.add('form-active')
}