(function() {
    let sidebarOpened = false
    let button = document.querySelector('#menu')
    button.addEventListener('click', (e) => {
        e.stopPropagation()
        e.preventDefault()
        document.body.classList.add('has-sidebar')
        sidebarOpened = true
    })

    document.body.addEventListener('click', () => {
        if(sidebarOpened) {
            document.body.classList.remove('has-sidebar')
        }
    })
})()