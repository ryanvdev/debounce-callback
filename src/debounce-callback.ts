interface IDebounceCallbackStorage<CallbackArgs extends any[]> {
    timerId: NodeJS.Timeout | undefined;
    currentArgs: CallbackArgs;
    counter: number;
}

// ======================================

interface CalcStepAndMaxReturn {
    step: number;
    max: number;
}

function calcStepAndMax(intWait: number): CalcStepAndMaxReturn {
    if (intWait < 20) {
        return {
            step: intWait,
            max: intWait,
        };
    }
    let n: number = 10;

    if (intWait < 100) {
        n = 5;
    }

    const remainder = intWait % n;

    if (remainder === 0) {
        return {
            max: intWait,
            step: intWait / n,
        };
    }

    if (remainder < n / 2) {
        const max = intWait - remainder;
        return {
            max,
            step: max / n,
        };
    }

    const max = intWait - remainder + n;
    return {
        max,
        step: max / n,
    };
}

/**
 * @param callback This is the callback you want to debounce
 * @param wait The amount of time in ms you want to wait after the latest call before setting a new state
 * @returns A debounced version of your callback
 * @default wait 100
 */
export function debounceCallback<CallbackArgs extends any[]>(
    callback: (...args: CallbackArgs) => any,
    wait: number = 100,
) {
    if (typeof wait !== 'number' || isNaN(wait) || !isFinite(wait) || wait <= 0) {
        throw new Error(
            '[debounceCallback] the wait parameter must be a limited number and the wait must greater than 0',
        );
    }

    const { step, max } = calcStepAndMax(Math.round(wait));

    const storage: IDebounceCallbackStorage<CallbackArgs> = {
        timerId: undefined,
        currentArgs: undefined as any,
        counter: 0,
    };

    return (...args: CallbackArgs): void => {
        storage.currentArgs = args;
        storage.counter = 0;

        if (storage.timerId !== undefined) {
            return;
        }

        storage.timerId = setInterval(async () => {
            if (storage.counter < max) {
                storage.counter += step;
                return;
            }

            // clean up
            clearInterval(storage.timerId);
            storage.counter = 0;
            storage.timerId = undefined;

            // dispatch
            await callback(...storage.currentArgs);
        }, step);
    };
}
