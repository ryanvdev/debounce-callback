import debounceCallback from "../src";
import { sleep } from "sakura-time-service";

interface LogTime {
    sum: number,
    time: number,
}

describe('debounceCallback', () => {
    test('Not Error!', async () => {
        const initWait = 20_000;
        const logTime = debounceCallback(async (a: number, b: number, logger:LogTime[]) => {
            logger.push({
                sum: a + b,
                time: Date.now()
            });
        }, initWait);

        
        const logs:LogTime[] = [];

        for(let i = 0; i < 5; i++){
            logTime(10, i, logs);
        }

        logTime(10, 5, logs);
        const initTime = Date.now();

        await sleep(initWait + 1_000);

        const waited = (logs[0].time || 0) - initTime;
        console.log(waited);

        const results:boolean[] = [
            logs.length === 1,
            waited - initWait < 300
        ];

        expect(results.includes(false)).toBe(false);
    });
    
})