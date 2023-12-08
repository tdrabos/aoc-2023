import * as fs from 'fs';

const timeDistanceMap: number[][] = [];


fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {

        const [timeRow, distanceRow] = data.toString().split(/\r?\n/, 2);

        const times = timeRow.split(':')[1].split(' ').filter(n => n).map(n => +n);
        const distances = distanceRow.split(':')[1].split(' ').filter(n => n).map(n => +n);

        const successNums: number[] = [];

        for (let i = 0; i < times.length; i++) {
            let min = 1, max = +times[i]-1, distance: number = 0;;
            let foundMin = false, foundMax = false;

            // min hold
            while (!foundMin) {
                distance = (+times[i]-min) * min;
                if (distance > +distances[i]) foundMin = true;
                else min++;
            }

            // max hold
            while (!foundMax) {
                distance = (+times[i]-max) * max
                if (distance > +distances[i]) foundMax = true;
                else max--;
            }

            successNums.push(max-min+1);
            console.log(successNums)
        }

        const product = successNums.reduce((a, b) => a*b, 1);

        console.log(product)
});