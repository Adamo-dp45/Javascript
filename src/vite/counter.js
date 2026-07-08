import confetti from "canvas-confetti"

/**
 * 
 * @param {HTMLElement} element 
 */
export function setupCounter(element) {
    let counter = 0
    const incrementer = () => {
        confetti()
        counter++
        element.innerHTML = `count is ${counter}`
    }
    element.addEventListener('click', incrementer)
}