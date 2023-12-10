import * as fs from 'fs';

class MapNode {
    constructor(
        public start: string,
        public end: string[]
    ) {}
}

const nodes: MapNode[] = [];

fs.readFile(
    'input.txt', 
    (_, data: Buffer) => {
        const input = data.toString().split(/\r?\n/).filter(n => n);

        const dir = [...input[0].replaceAll('R', '1').replaceAll('L', '0')].map(x => +x);

        for (let i = 1; i<input.length; i++) {
            const [start, end] = input[i].split(' = ', 2);
            const [left, right] = end.replace('(', '').replace(')', '').split(', ', 2);

            nodes.push(new MapNode(start, [left, right]));
        }

        let currentNode = nodes.find(x => x.start === 'AAA'),
            steps = 0, idx = 0;
        
        while (currentNode?.start !== 'ZZZ') {
            currentNode = nodes.find(x => x.start === currentNode?.end[dir[idx]]);
            steps++;
            idx++;
            if (idx === dir.length) idx = 0;
        }
        
        console.log(steps);
    }
);