export function formatToManwon(price: number): string {
    const manwon = Math.round(price / 10000);
    return `${manwon.toLocaleString()}만원`;
}