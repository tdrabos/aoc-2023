import * as fs from 'fs';

const ZERO = "0".charCodeAt(0);
const NINE = "9".charCodeAt(0);

const strToNumMap = new Map<string, number>([
    ["one", 1], ["two", 2], ["three", 3],
    ["four", 4], ["five", 5], ["six", 6],
    ["seven", 7], ["eight", 8], ["nine", 9]
]);

const isDigit = (n: number): boolean => {
    return (n > ZERO && n <= NINE);
}

const calculateCorrectNumbers = (
    record: string,
    currentFirstIdx: number,
    currentLastIdx: number): number[] => 
{
    const strNums = [...strToNumMap.keys()];

    let firstIdx = currentFirstIdx;
    let firstNum = 0;
    let i = 0;

    let lastIdx = currentLastIdx;
    let lastNum = 0;
    let j = strNums.length - 1;

    // Check for the first number
    while (firstIdx >= 3 && i < strNums.length) {
        let idx = record.indexOf(strNums[i]);
        if (idx > -1) {
            if (firstIdx > idx) {
                firstIdx = idx;
                firstNum = strToNumMap.get(strNums[i])!;
            }
        }
        i++;
    }

    // Check for the second number
    while (j >= 0) {
        let idx = record.lastIndexOf(strNums[j]);
        if (idx > -1) {
            if (lastIdx < idx) {
                lastIdx = idx;
                lastNum = strToNumMap.get(strNums[j])!;
            }
        }
        j--;
    }

    let first, last;

    if (firstNum !== 0 && firstIdx < currentFirstIdx) first = firstNum;
    else first = +record[currentFirstIdx];

    if (lastNum !== 0 && lastIdx > currentLastIdx) last = lastNum;
    else last = +record[currentLastIdx];

    return [first, last];
};


const extractNumber = (record: string): number => {
    let i = 0, j = record.length - 1;

    // First number
    while (!isDigit(record.charCodeAt(i)) && i < record.length) i++;

    // Second number
    while (!isDigit(record.charCodeAt(j)) && j > 0) j--;

    // Check if there are any stringified numbers that should replace the digits
    const [first, last] = calculateCorrectNumbers(record, i, j);

    return first * 10 + last;
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