import * as fs from 'fs';

const SYMBOLS_REGEX = /[^A-Za-z 0-9 .]/g;

let input: string[][] = [];

const findNumber = (row: number, col: number): number => {
    let num = 0;
    let dec = 1, colPtr = col;

    while (colPtr+1 < input[row].length && !Number.isNaN(+input[row][colPtr+1])) colPtr++;

    while (colPtr >= 0 && !Number.isNaN(+input[row][colPtr])) {
        num += +input[row][colPtr] * dec;
        dec *= 10;
        input[row][colPtr] = '.';
        colPtr--;
    }

    return num;
};

// Returns the sum of all the numbers adjacent to a symbol
const sumGearRatios = (row: number, col: number): number => {
    let numbers: number[] = [];

    // UP - row-1
    if (row > 0) {
        for (let i = 0; i < 3 ; i++) {
            if (col-1+i >= 0 &&
                col-1+i <= input[row].length-1 &&
                !Number.isNaN(+input[row-1][col-1+i]))
            {
                numbers.push(findNumber(row-1, col-1+i));
            }
        }
    }
    
    // DOWN - row+1
    if (row < input.length - 1) {
        for (let i = 0; i < 3 ; i++) {
            if (col-1+i >= 0 && 
                col-1+i <= input[row].length-1 && 
                !Number.isNaN(+input[row+1][col-1+i])) 
            {
                numbers.push(findNumber(row+1, col-1+i));
            }
        }
    }

    // LEFT - col-1
    if (col > 0 && !Number.isNaN(+input[row][col-1])) 
        numbers.push(findNumber(row, col-1));

    // RIGHT - col+1
    if (col < input[row].length-1 && !Number.isNaN(+input[row][col+1]))
        numbers.push(findNumber(row, col+1));

    return numbers.length === 2 ? numbers[0]*numbers[1] : 0; 
};

const sumPartNumbers = (): number => {
    let sum = 0;

    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (input[row][col] === '*') {
                sum += sumGearRatios(row, col);
            }
               
        }
    }
    

    return sum;
};

fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {
        let stream = data.toString().split(/\r?\n/);
        
        for (let i = 0; i<stream.length; i++) {
            input[i] = [...stream[i]];
        }
        
        console.log(sumPartNumbers());
    }
);