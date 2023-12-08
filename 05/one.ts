import * as fs from 'fs';

const calculateArrayForMap = (
    input: string[],
    startIdx: number,
    srcArray: number[]
): {nextIdx: number, dstArray: number[]} => {
    const dstArray: number[] = [];

    srcArray.forEach(entry => {
        let found = false;
        let idx = startIdx+1;
        while (idx < input.length && !input[idx].includes('map') && !found) {
            let [dst, src, range] = input[idx].split(' ', 3);
            if (entry >= +src && entry <= +src + +range) {
                dstArray.push(+dst + entry - +src);
                found = true;
            } else idx++;      
        }

        if (!found) dstArray.push(entry);
    });   

    let nextIdx: number = startIdx+1, i=0;
    while (startIdx + 1 + i < input.length && !input[startIdx+1+i].includes('map')) {
        nextIdx++;
        i++;
    }

    return {
        nextIdx: nextIdx,
        dstArray: dstArray
    };
};

fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {
        const input = data.toString().split(/\r?\n/).filter(n => n);
        let currentArray = input[0].split(':')[1].trim().split(' ').map(n => +n);

        let idx = 1; // First map start at the second line
        for (let i = 0; i < 7; i++) { // There are 7 maps
            console.log('iteration: ' + i)
            const {nextIdx, dstArray} = calculateArrayForMap(input, idx, currentArray);
            idx = nextIdx;
            currentArray = dstArray;
        }
        currentArray.sort((a, b) => a - b);
        console.log(currentArray);
    }
);