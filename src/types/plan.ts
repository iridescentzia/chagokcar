import type { Vehicle } from "./vehicle";
import type { Region } from "./registration";

export type PlanMethod = "period" | "monthly";

export interface PlanState {
    selectedVehicle: Vehicle | null;

    // 예상 구매 조건
    expectedPurchasePrice: number;
    registrationRegion: Region | null;

    // 선수금
    targetDownPayment: number;
    currentSavings: number;

    // 계획 방식
    planMethod: PlanMethod | null;
    targetMonths: number;
    monthlySavings: number;
}

export interface PlanResult {
    amountToSave: number;
    monthlySavings: number;
    targetMonths: number;
    remainingPurchaseAmount: number;
}