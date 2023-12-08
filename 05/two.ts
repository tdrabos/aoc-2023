import * as fs from 'fs';

const checkSeedForLocation = (
    input: string[],
    startNum: number,
    startIdx: number
): {nextIdx: number, dstNum: number} => {
    let dstNum = 0,
        found = false,
        idx = startIdx-1;

    while (idx > 0 && !input[idx].includes('map') && !found) {
        let [src, dst, range] = input[idx].split(' ', 3);
        if (startNum >= +src && startNum <= +src + +range) {
            dstNum = +dst + startNum - +src;
            found = true;
        } else idx--;      
    }

    if (!found) dstNum = startNum;
      
    let nextIdx: number = startIdx-1, i=0;
    while (startIdx - 1 - i > 0 && !input[startIdx-1-i].includes('map')) {
        nextIdx--;
        i++;
    }
    return {
        nextIdx: nextIdx,
        dstNum: dstNum
    };
};

fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {
        const input = data.toString().split(/\r?\n/).filter(n => n);

        const firstRow = input[0].split(':')[1].trim().split(' ').map(n => +n);

        const ranges: number[][] = [];
        for (let i = 0; i < firstRow.length; i+=2) {
            const start = firstRow[i], range = firstRow[i+1];
            ranges.push([start, range+start]);
        }

        let foundSeed = false, currentLocation = 0;
        let targetSeed = 0;
        
        while (!foundSeed) {
            currentLocation++;
            console.log('checking seed for location: ' + currentLocation)
             let idx = input.length-1, currentNum = currentLocation;

            for (let i = 0; i < 7; i++) {
                const { nextIdx, dstNum } = checkSeedForLocation(input, currentNum, idx);

                idx = nextIdx;
                currentNum = dstNum;
            }

            for (let i = 0; i<ranges.length; i++) {
                const [start, end] = ranges[i];

                if (currentNum >= start && currentNum <= end) {
                    console.log('found seed for minimal location: ' + currentLocation);
                    console.log(start)
                    console.log(end)
                    targetSeed = currentNum
                    foundSeed = true;
                }
            }

            console.log(currentLocation);
            
        }

    }
);