const calcInput = document.getElementById("calc-input")
const inputWrapper = document.getElementById("input-wrapper")

export function fullErasureAnimation() {
    const timeLength = 700   //ms

    const overlappingDiv = document.createElement('div')
    overlappingDiv.classList.add("overlappingDiv")
    inputWrapper.append(overlappingDiv)
    overlappingDiv.style.animation = `overlapToBottom ${timeLength / 1000}s ease forwards`

    // removing overlapping block when animation ends
    setTimeout(() => {
        overlappingDiv.remove()
    }, timeLength)

    return timeLength
}