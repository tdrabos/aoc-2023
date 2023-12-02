import * as fs from 'fs';

const validColors = new Map<string, number>([
    ["red", 12],
    ["green", 13],
    ["blue", 14]
])

const countValidGames = (input: string[]): number => {
    let sum = 0;

    input.forEach(row => {
        const [gameTitle, draws] = row.split(':', 2);
        const gameId = +gameTitle.split(' ', 2)[1];

        const drawArray = draws.split(';');
        let isValidGame = true;
        let i = 0;

        while (isValidGame && i < drawArray.length) {
            const numbersWithColors = drawArray[i].trim().split(', ');
            let j = 0;

            while (isValidGame && j < numbersWithColors.length) {
                
                const [cnt, color] = numbersWithColors[j].split(' ');
                if (+cnt > validColors.get(color)!) isValidGame = false;
                else j++;
            }
            i++;
        }

        if (isValidGame) sum += gameId;
    });

    return sum;
};

fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {
        const input = data.toString().split(/\r?\n/);
        
        console.log(countValidGames(input));        
    }
);