export interface Vehicle {
    id: string;
    name: string;
    price: number; // 원 단위
    image: string; // public/vehicles/ 기준 경로
}

// 사용자 입력값
export interface PlanState {
    selectedVehicle: Vehicle | null;
    targetDownPayment: number;   // 목표 선수금
    currentSavings: number;      // 현재 준비금
    targetMonths: number;        // 목표 기간(개월)
}

// 사용자 입력값 기반으로 계산해서 만들어지는 값
export interface PlanResult {
    amountToSave: number;           // 더 모아야 할 금액
    monthlySavings: number;         // 월 납입액
    remainingPurchaseAmount: number; // 잔여 구매 금액
}