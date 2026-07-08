class Autogrow extends HTMLTextAreaElement {

    constructor() {
        super()
        this.onFocus = this.onFocus.bind(this)
        this.autogrow = this.autogrow.bind(this)
        this.onRisize = debounce(this.onRisize.bind(this), 300) 
    }

    connectedCallback() {
        this.addEventListener('focus', this.onFocus)
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.onRisize)
    }

    onFocus() {
        this.style.overflow = 'hidden'
        this.style.resize = 'none'
        this.style.boxSizing = 'border-box'
        this.autogrow()
        window.addEventListener('resize', this.onRisize)
        this.addEventListener('input', this.autogrow)
        this.removeEventListener('focus', this.onFocus)
    }

    onRisize() {
        this.autogrow()
    }

    autogrow() {
        this.style.height = 'auto'
        this.style.height = this.scrollHeight + 'px'
    }
}

customElements.define('textarea-autogrow', Autogrow, {extends: 'textarea'})

function debounce(func, delay) {
    let timeout
    return function () {
        const context = this
        const args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(context, args), delay)
    }
}

// Ou --
class TextareaAutogrow extends HTMLTextAreaElement {
    static register() {
        customElements.define("textarea-autogrow", TextareaAutogrow, {
            extends: "textarea",
        })
    }

    autogrow() {
        const previousHeight = this.style.height
        this.style.height = "auto"
        if (this.style.height !== previousHeight) {
            this.dispatchEvent(
                new CustomEvent("grow", {
                    detail: {
                        height: this.scrollHeight,
                    },
                })
            )
        }
        this.style.height = this.scrollHeight + "px"
    }

    onFocus() {
        this.autogrow();
        window.addEventListener("resize", this.onResize)
        this.removeEventListener("focus", this.onFocus)
    }

    onResize() {
        this.autogrow();
    }

    connectedCallback() {
        this.style.overflow = "hidden"
        this.style.resize = "none"
        this.addEventListener("input", this.autogrow)
        this.addEventListener("focus", this.onFocus)
    }

    disconnectedCallback() {
        window.removeEventListener("resize", this.onResize)
    }

    constructor() {
        super()
        this.autogrow = this.autogrow.bind(this)
        this.onResize = debounce(this.onResize.bind(this), 300)
        this.onFocus = this.onFocus.bind(this)
    }
}

// <textarea name="content" id="content" is="textarea-autogrow">A long text here</textarea>