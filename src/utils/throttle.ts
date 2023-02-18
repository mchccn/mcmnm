export function throttle<F extends (...args: any[]) => void>(fn: F, delay: number) {
    let timeout = -1;

    let state: Parameters<F> | undefined = undefined;

    return function throttled(this: unknown, ...args: Parameters<F>) {
        state = args;

        const now = timeout === -1;

        if (now) {
            fn.apply(this, state);

            state = undefined;

            timeout = setTimeout(() => {
                timeout = -1;

                if (state) throttled.apply(this, state);
            }, delay);
        }
    };
}
