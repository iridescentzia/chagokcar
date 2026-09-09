export function formatToManwon(price: number): string {
    const manwon = Math.round(price / 10000);
    return `${manwon.toLocaleString()}만원`;
}

export function formatWon(price: number): string {
    return `${price.toLocaleString()}원`;
}

// "10000000" 같은 순수 숫자 문자열에 콤마를 붙임
export function formatNumberInput(value: string): string {
    const onlyDigits = value.replace(/[^0-9]/g, "");
    if (!onlyDigits) return "";
    return Number(onlyDigits).toLocaleString();
}

// "10,000,000" 같은 콤마 포함 문자열에서 숫자만 추출
export function parseNumberInput(value: string): number {
    const onlyDigits = value.replace(/[^0-9]/g, "");
    return onlyDigits ? Number(onlyDigits) : 0;
}

export function formatNumberOnly(price: number): string {
    return price.toLocaleString();
}