import type { PlanMethod, PlanResult } from "../types/plan";

interface CalculatePlanParams {
    expectedPurchasePrice: number;
    targetDownPayment: number;
    currentSavings: number;
    planMethod: PlanMethod;
    targetMonths: number;
    monthlySavings: number;
}

export const calculatePlan = ({
                                  expectedPurchasePrice,
                                  targetDownPayment,
                                  currentSavings,
                                  planMethod,
                                  targetMonths,
                                  monthlySavings,
                              }: CalculatePlanParams): PlanResult => {
    const amountToSave = Math.max(
        targetDownPayment - currentSavings,
        0
    );

    const remainingPurchaseAmount = Math.max(
        expectedPurchasePrice - targetDownPayment,
        0
    );

    let calculatedMonthlySavings = 0;
    let calculatedTargetMonths = 0;

    if (planMethod === "period") {
        calculatedTargetMonths = targetMonths;

        calculatedMonthlySavings =
            targetMonths > 0
                ? Math.ceil(amountToSave / targetMonths)
                : 0;
    }

    if (planMethod === "monthly") {
        calculatedMonthlySavings = monthlySavings;

        calculatedTargetMonths =
            monthlySavings > 0
                ? Math.ceil(amountToSave / monthlySavings)
                : 0;
    }

    return {
        amountToSave,
        monthlySavings: calculatedMonthlySavings,
        targetMonths: calculatedTargetMonths,
        remainingPurchaseAmount,
    };
};