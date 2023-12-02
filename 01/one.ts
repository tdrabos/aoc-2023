import * as fs from 'fs';

const ZERO = "0".charCodeAt(0);
const NINE = "9".charCodeAt(0);

const isDigit = (n: number): boolean => (n >= ZERO && n <= NINE);

const extractNumber = (record: string): number => {
    let i = 0, j = record.length-1, sum = 0;

    // First number
    while (!isDigit(record.charCodeAt(i))) i++;

    // Second number
    while (!isDigit(record.charCodeAt(j))) j--;

    sum = (+record[i])*10 + +record[j]; 

    return sum;
    
};

fs.readFile(
    'input1.txt', 
    (_, data: Buffer) => {
        const values = data.toString().split(/\r?\n/);
        
        let sum = 0;

        values.forEach(val => sum += extractNumber(val))

        console.log(sum);
    }
);