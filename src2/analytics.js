/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
function createAnalytics() {
    let counter = 0
    const destroyed = false

    // eslint-disable-next-line no-plusplus
    const listener = () => counter++

    document.addEventListener('click', listener);

    return {
        destroy() {
            document.removeEventListener('click', listener)
            destroyed = true
        },

        getClicks() {
            if (destroyed) {
                return `Analytics is destroyed.- Total clicks = ${counter}`
            }
            return counter
        }
    }
}

window.analytics = createAnalytics();