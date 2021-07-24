const calcInput = document.getElementById("calc-input")
const inputWrapper = document.getElementById("input-wrapper")
const underInput = document.getElementById("under-input")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



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



export function oneSymbolErasureAnimation() {
    checkAnimationState()
    const timeLength = 200   //ms

    const curValue = underInput.innerText
    const lastSymbol = curValue[curValue.length - 1]
    underInput.innerHTML = curValue.slice(0, curValue.length - 1)

    // beginning of lastSymbolSpan adding 
    const lastSymbolSpan = document.createElement('span')
    lastSymbolSpan.innerText = lastSymbol
    lastSymbolSpan.id = "last-symbol-span"
    lastSymbolSpan.classList.add("calc-input-font")
    lastSymbolSpan.classList.add("last-symbol-under-input")

    if (calcInput.value.length > 16) lastSymbolSpan.style.fontSize = "1.5rem"
    else if (calcInput.value.length > 10) lastSymbolSpan.style.fontSize = "2rem"
    else lastSymbolSpan.style.fontSize = "3rem"
    
    lastSymbolSpan.style.animation = `symbolGoesUp ${timeLength / 1000}s ease forwards`
    underInput.append(lastSymbolSpan)
    // ending of lastSymbolSpan adding 

    // removing last symbol when animation ends
    sleep(timeLength).then(() => {
        lastSymbolSpan.remove()
    })
}

function checkAnimationState() {
    let underInputLength = underInput.innerText.length 
    const lastSymbolSpan = document.getElementById("last-symbol-span")
    if (lastSymbolSpan) underInputLength++
    if (calcInput.value.length - underInputLength !== -1 && lastSymbolSpan) {
        lastSymbolSpan.remove()
    }
}