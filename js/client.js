export function setBtnListeners() {
    const calc = document.getElementById("calc")
    const btns = document.getElementsByClassName("btn-calc")

    for (const btn of btns) {
        btn.addEventListener("click", (event) => {
            event.stopPropagation()
            console.log(event.currentTarget.children[0].innerHTML)
        })
    }
}