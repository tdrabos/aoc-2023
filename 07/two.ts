import * as fs from 'fs';

class Hand {
    constructor(
        public cards: string,
        public bid: number
    ) {}
};

const card_order = 'J23456789TJQKA';

const handsMap = new Map<number, Hand[]>([
    [1, []], [2, []], [3, []],
    [4, []], [5, []], [6, []],
    [7, []], 
]);

const evaluateHand = (cards: string, bid: number): void => {
    let key = 0;
    const cntObj: any = {};
    
    [...cards].forEach(card => {
        cntObj[card] = (cntObj[card] || 0) + 1;
    });

    console.log(cards);


    const jokers = cntObj['J'];
    const cnt: number[] = Object.values(cntObj);

    console.log(cnt);

    if (jokers) {
        cnt.splice(cnt.indexOf(jokers), 1);

        if (cnt.length === 0) cnt.push(0)

        cnt.sort((a,b) => b-a);
        cnt[0] += jokers;
    }

    console.log(cnt);

    if (cnt.includes(5)) key = 7
    else if (cnt.includes(4)) key = 6
    else if (cnt.includes(3) && cnt.includes(2)) key = 5
    else if (cnt.includes(3)) key = 4
    else if (cnt.includes(2) && cnt.length === 3) key = 3
    else if (cnt.includes(2)) key = 2
    else key = 1

    handsMap.get(key)?.push(new Hand(cards, bid));
}

fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {
        const input = data.toString().split(/\r?\n/)

        input.forEach(row => {
            const [hand, bid] = row.split(' ', 2); 
            evaluateHand(hand, +bid);
        });

        let bidProduct = 0, rank = 1;

        handsMap.forEach((value: Hand[], _) => {
            value.sort((a: Hand, b: Hand) => {
                let i = 0;
                while (a.cards[i] === b.cards[i] && i < 5) i++;

                if (i === 5) i = 4;
                
                return card_order.indexOf(a.cards[i]) - card_order.indexOf(b.cards[i]);
            });

            for (let i = 0; i<value.length; i++) {
                bidProduct += value[i].bid * rank;
                rank++;
            }
        });
        console.log(bidProduct);
    }
);