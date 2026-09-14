import type { PlanResult } from "../types/plan.ts";

export function calculatePlan(
    vehiclePrice: number,
    targetDownPayment: number,
    currentSavings: number,
    targetMonths: number
): PlanResult {
    // 음수/이상값 방지
    const safeDownPayment = Math.max(0, targetDownPayment);
    const safeSavings = Math.max(0, currentSavings);
    const safeMonths = Math.max(0, targetMonths); // 0으로 나누기 방지

    const amountToSave = Math.max(0, safeDownPayment - safeSavings);
    const monthlySavings = Math.ceil(amountToSave / safeMonths);
    const remainingPurchaseAmount = Math.max(0, vehiclePrice - safeDownPayment);

    return {
        amountToSave,
        monthlySavings,
        remainingPurchaseAmount,
    };
}