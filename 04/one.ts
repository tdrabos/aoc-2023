import * as fs from 'fs';

const parseRow = (input: string): number => {
    let sum = 0;

    const [_, deck] = input.split(':', 2);
    const [w, h] = deck.split('|', 2);

    const winning = w.split(' ').filter(n => n);
    const hand = h.split(' ').filter(n => n);

    const common = winning.filter(w => hand.some(h => h === w));

    for (let i = 0; i < common.length; i++) {
        if (sum === 0) sum++;
        else sum *= 2;
    }

    return sum;
};

fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {
        const input = data.toString().split(/\r?\n/);
        let sum = 0;

        input.forEach(row => sum+=parseRow(row))

        console.log(sum);
    }
);