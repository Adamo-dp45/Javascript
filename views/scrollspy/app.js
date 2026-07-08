const ratio = .6
let observer = null
const spices = document.querySelectorAll('[data-spy]')

/**
 * @param {HTMLElement} element 
*/
const activate = function(element) {
    const id = element.getAttribute('id')
    const anchor = document.querySelector(`a[href="#${id}"]`)
    if(anchor === null) { return null }
    anchor.parentElement
        .querySelectorAll('.active')
        .forEach(node => node.classList.remove('active'))
    anchor.classList.add('active')
}

/**
 * @param {IntersectionObserverEntry[]} entries 
 * @param {IntersectionObserver} observer 
*/
const callback = function (entries, observer) {
    entries.forEach(function(entry) {
        // if(entry.isIntersecting) {
        if(entry.intersectionRatio > 0) {
            activate(entry.target)
        }
    })
}

/**
 * 
 * @param {NodeListOf.<Element>} elements
 */
const observe = function(elements) {
    if(observer !== null) {
        elements.forEach(element => observer.unobserve(element))
    }
    const y = Math.round(window.innerHeight * ratio)
    observer = new IntersectionObserver(callback, {
       rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`,
    })
    spices.forEach(function(spy) {
        observer.observe(spy)
    })
} 

/**
 * 
 * @param {Function} callback 
 * @param {number} delay 
 * @returns {Function}
*/
const debounce = function(callback, delay) {
    let timer;
    return function() {
        let args = arguments
        let context = this
        clearTimeout(timer)
        timer = setTimeout(function() {
            callback.apply(context, args)
        }, delay)
    }
}

if(spices.length > 0) {
    observe(spices)
    let windowH = window.innerHeight
    window.addEventListener('resize', debounce(function() {
        if(window.innerHeight !== windowH) {
            console.log('test')
            observe(spices)
            windowH = window.innerHeight
        }
    }, 500))
}