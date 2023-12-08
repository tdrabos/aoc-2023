import * as fs from 'fs';

const timeDistanceMap: number[][] = [];


fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {

        const [timeRow, distanceRow] = data.toString().split(/\r?\n/, 2);

        const time = +timeRow.split(':')[1].split(' ').filter(n => n).reduce((a, b) => a+b, '');
        const distance = +distanceRow.split(':')[1].split(' ').filter(n => n).reduce((a, b) => a+b, '');
        
        let min = 1, max = +time, dst: number = 0;;
        let foundMin = false, foundMax = false;

        // min hold
        while (!foundMin) {
            dst = (time-min) * min;
            if (dst > +distance) foundMin = true;
            else min++;
        }

        // max hold
        while (!foundMax) {
            dst = (time-max) * max
            if (dst > distance) foundMax = true;
            else max--;
        }

        const successNum = max-min+1;
        console.log(successNum);
});