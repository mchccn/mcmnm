export async function waitForClick<E extends Element>(...elements: E[]): Promise<E> {
    return Promise.race(
        elements.map(
            (element) =>
                new Promise<E>((resolve) => {
                    const controller = new AbortController();

                    return element.addEventListener(
                        "click",
                        () => {
                            controller.abort();

                            return resolve(element);
                        },
                        { signal: controller.signal },
                    );
                }),
        ),
    );
}

export async function waitForClickWithTimeout<E extends Element>(...args: [...E[], number]): Promise<E | undefined> {
    const elements = args.slice(0, -1) as E[];
    const timeout = args.at(-1) as number;

    return Promise.race(
        elements.map(
            (element) =>
                new Promise<E | undefined>((resolve) => {
                    const controller = new AbortController();

                    setTimeout(() => {
                        controller.abort();

                        return resolve(undefined);
                    }, timeout);

                    return element.addEventListener(
                        "click",
                        () => {
                            controller.abort();

                            return resolve(element);
                        },
                        { signal: controller.signal },
                    );
                }),
        ),
    );
}

export async function waitForClickRejectOnTimeout<E extends Element>(...args: [...E[], number]): Promise<E> {
    const elements = args.slice(0, -1) as E[];
    const timeout = args.at(-1) as number;

    return Promise.race(
        elements.map(
            (element) =>
                new Promise<E>((resolve, reject) => {
                    const controller = new AbortController();

                    setTimeout(() => {
                        controller.abort();

                        return reject();
                    }, timeout);

                    return element.addEventListener(
                        "click",
                        () => {
                            controller.abort();

                            return resolve(element);
                        },
                        { signal: controller.signal },
                    );
                }),
        ),
    );
}
