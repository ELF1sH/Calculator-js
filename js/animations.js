const calcInput = document.getElementById("calc-input")
const inputWrapper = document.getElementById("input-wrapper")

export function fullErasureAnimation() {
    const timeLength = 700   //ms
    console.log("full")
    const overlappingDiv = document.createElement('div')
    inputWrapper.style.position = "relative"
    inputWrapper.style.overflow = "hidden"
    overlappingDiv.classList.add("overlappingDiv")
    inputWrapper.append(overlappingDiv)
    overlappingDiv.style.animation = `overlapToBottom ${timeLength / 1000}s ease forwards`

    const timerID = setTimeout(() => {
        overlappingDiv.remove()
    }, timeLength)

    return timeLength
}