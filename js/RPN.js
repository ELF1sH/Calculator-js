// Reverse Polish Notation
export class RPN {
    launch(inputValue) {
        const s = new Stack()
        let currentNumber = ""
        for (const symbol of inputValue) {
            if (symbol !== "+" && symbol !== "-" && symbol !== "*" && symbol !== "/"
            && symbol !== "(" && symbol !== ")") {
                currentNumber += symbol
            }
            else {
                if (currentNumber !== "") {
                    s.push(+currentNumber)
                }
                switch (symbol) {
                    case "+":
                        s.push(new Sign(0))
                        break
                    case "-":
                        s.push(new Sign(1))
                        break
                    case "*":
                        s.push(new Sign(2))
                        break
                    case "/":
                        s.push(new Sign(3))
                        break
                }
            }
        }
        s.print()
        console.log("-------------------------")
    }
}

class Stack {
    arr = new Array()
    push(elem) {
        this.arr.push(elem)
    }
    print() {
        for (const elem of this.arr) {
            console.log(elem)
        }
    }
}

class Sign {
    constructor(status) {
        this.status = status
        // 0 - plus
        // 1 - minus
        // 2 - multiplication
        // 3 - division
    }
}