export function debounce<F extends (...args: any[]) => void>(fn: F, delay: number, immediate = false): F {
    let timeout = -1;

    return function debounced(this: unknown, ...args: Parameters<F>) {
        const later = () => {
            timeout = -1;

            if (!immediate) fn.apply(this, args);
        };

        const now = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, delay);

        if (now) fn.apply(this, args);
    } as F;
}
