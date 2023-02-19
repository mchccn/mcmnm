export function wrapTextInSpan(text: string) {
    const span = document.createElement("span");

    span.textContent = text;

    return span;
}