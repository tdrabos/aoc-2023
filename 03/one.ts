import * as fs from 'fs';

// Go through all symbols in matrix -> main method
// If we find a symbol, check LEFT, RIGHT, UP, DOWN, DIAG (enclosing rectangle) -> method
// If we find a number during this check, go to its start (while the next left is a .), then read the whole number (while the next right is a .) -> method

const SYMBOLS_REGEX = /[^A-Za-z 0-9 .]/g;

let input: string[][] = [];

const findNumber = (row: number, col: number): number => {

    console.log(`found number at (${row};${col})`)

    let num = 0;
    let dec = 1, colPtr = col;

    while (colPtr+1 < input[row].length && !Number.isNaN(+input[row][colPtr+1])) colPtr++;

    while (colPtr >= 0 && !Number.isNaN(+input[row][colPtr])) {

        //console.log(`number ${colPtr}. : ${input[row][colPtr]}`);

        num += +input[row][colPtr] * dec;
        dec *= 10;
        input[row][colPtr] = '.';
        colPtr--;
    }

    console.log('found number: ' +num)

    return num;
};

// Returns the sum of all the numbers adjacent to a symbol
const sumNumbersForSymbol = (row: number, col: number): number => {
    let sum = 0;

    // UP - row-1
    if (row > 0) {
        for (let i = 0; i < 3 ; i++) {
            if (col-1+i >= 0 &&
                col-1+i <= input[row].length-1 &&
                !Number.isNaN(+input[row-1][col-1+i]))
            {
                sum += findNumber(row-1, col-1+i);
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
                sum += findNumber(row+1, col-1+i);
            }
        }
    }

    // LEFT - col-1
    if (col > 0 && !Number.isNaN(+input[row][col-1])) 
        sum += findNumber(row, col-1);

    // RIGHT - col+1
    if (col < input[row].length-1 && !Number.isNaN(+input[row][col+1]))
        sum += findNumber(row, col+1);

    //console.log(sum);

    return sum;
};

const sumPartNumbers = (): number => {
    let sum = 0;

    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (input[row][col].match(SYMBOLS_REGEX)) {
                //console.log('found at: (' + row + ';' + col + ')')
                sum += sumNumbersForSymbol(row, col);
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
        
        console.log('sum of all numbers: ' + sumPartNumbers());
    }
);