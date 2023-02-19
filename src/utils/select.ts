export function select<T>() {
    return function <A extends T>(...args: A[]) {
        return args;
    };
}
