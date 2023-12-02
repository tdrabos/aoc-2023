import * as fs from 'fs';

const minSetPowerSum = (input: string[]): number => {
    let sum = 0;

    // For each game
    input.forEach(row => {
        const [gameTitle, draws] = row.split(':', 2);
        const gameId = +gameTitle.split(' ', 2)[1];

        const drawArray = draws.split(';');

        const reds: number[] = [];
        const greens: number[] = [];
        const blues: number[] = [];

        // For each draw
        drawArray.forEach(draw => {
            const numbersWithColors = draw.trim().split(', ');
            numbersWithColors.forEach(n => {
                const [cnt, color] = n.split(' ');
                switch(color) {
                    case 'red': {
                        reds.push(parseInt(cnt,10));
                        break;
                    } 
                    case 'green': {
                        greens.push(parseInt(cnt,10));
                        break;
                    }
                    case 'blue': {
                        blues.push(parseInt(cnt,10));
                        break;
                    }
                }
            });
        });

        reds.sort((a, b) => b-a);
        greens.sort((a, b) => b-a);
        blues.sort((a, b) => b-a);
        
        sum += (reds[0] * greens[0] * blues[0]);
    });

    return sum;
};

fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {
        const input = data.toString().split(/\r?\n/);
        
        console.log(minSetPowerSum(input));   
    }
);