import * as fs from 'fs';

const currentCards = new Map<number, any>();

const parseRow = (input: string) => {
    const [title, deck] = input.split(':', 2);
    const cardId = +title.split(' ').filter(n => n)[1];

    const [w, h] = deck.split('|', 2);

    const winning = w.split(' ').filter(n => n);
    const hand = h.split(' ').filter(n => n);

    const common = winning.filter(w => hand.some(h => h === w));

    currentCards.set(cardId, {
        cnt: 1,
        cmn: common.length
    });
};

fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {
        const input = data.toString().split(/\r?\n/);
        let sum = 0;

        input.forEach(row => parseRow(row))

        currentCards.forEach((content, cardId) => {
            for (let j = 0; j < content.cnt; j++) {
                for (let i = 0; i < content.cmn ; i++) currentCards.get(cardId+1+i).cnt++;
            }
            sum += content.cnt;            
        });

        console.log(sum);
    }
);