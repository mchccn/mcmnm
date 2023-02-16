export function html(template: TemplateStringsArray, ...values: unknown[]): HTMLElement;
export function html(html: string): HTMLElement;
export function html(...args: [string] | [TemplateStringsArray, ...unknown[]]) {
    const [template, ...values] = args;

    const html =
        typeof template === "string" ? template : template.reduce((html, s, i) => html + s + (values[i] ?? ""), "");

    return new DOMParser().parseFromString(html, "text/html").body.childNodes[0];
}