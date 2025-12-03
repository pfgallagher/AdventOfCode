import { readFile } from 'fs/promises';

/*
    Probably going to continue with TypeScript from now on because
    I've basically been thinking in TypeScript and translating
    into OCaml which probably isn't the best way to learn
    idiomatic Ocaml...
*/

class Stack {
    private values: string[] = [];
    pop = () => this.values.pop();
    push = (str: string) => {
        this.values.push(str);
    }
    top = () => this.values[this.length() - 1];
    toNumber = () => Number.parseInt(this.values.join(''), 10);
    length = () => this.values.length;
}

const largestBattery = (str: string, n: number) => {
    const stack = new Stack();
    for (let i = 0; i < str.length; i++) {
        const val = str[i];
        while (
            stack.top() < val &&
            n < str.length - i + stack.length()
        ) {
            stack.pop();
        }
        if (stack.length() < n) {
            stack.push(val);
        }
    }
    return stack.toNumber();
}

(async () => {
    const input = (await readFile('2025/03/day3.txt', 'utf-8')).split('\n');
    const largest2Sum = input.reduce((acc, cur) => acc + largestBattery(cur, 2), 0);
    const largest12Sum = input.reduce((acc, cur) => acc + largestBattery(cur, 12), 0);
    console.log(largest2Sum); // 17412 
    console.log(largest12Sum); // 172681562473501
})();