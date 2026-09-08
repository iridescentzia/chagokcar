import { useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { calculatePlan } from "../utils/calculate";

export default function MonthlyPlan() {
    const navigate = useNavigate();
    const {
        selectedVehicle,
        targetDownPayment,
        currentSavings,
        targetMonths,
    } = usePlan();

    if (!selectedVehicle || !targetDownPayment || !targetMonths) {
        return (
            <div style={{ padding: 24 }}>
                <p>목표 설정 정보가 없어요. 목표를 먼저 설정해주세요.</p>
                <button onClick={() => navigate("/goal-setting")}>
                    목표 설정하러 가기
                </button>
            </div>
        );
    }

    const result = calculatePlan(
        selectedVehicle.price,
        targetDownPayment,
        currentSavings,
        targetMonths
    );

    return (
        <div style={{ padding: 24 }}>
            <h1>목표 차량 구매를 위해 매월 이만큼 모아보세요</h1>

            <div style={{ padding: 24, background: "#f5f5f5", marginBottom: 24 }}>
                <p>월 필요 저축액</p>
                <h2>{result.monthlySavings.toLocaleString()}원</h2>
            </div>

            <div style={{ marginBottom: 24 }}>
                <p>목표 차량: {selectedVehicle.name}</p>
                <p>예상 차량 가격: {selectedVehicle.price.toLocaleString()}원</p>
                <p>목표 선수금: {targetDownPayment.toLocaleString()}원</p>
                <p>현재 준비금: {currentSavings.toLocaleString()}원</p>
                <p>앞으로 준비할 금액: {result.amountToSave.toLocaleString()}원</p>
                <p>목표 기간: {targetMonths}개월</p>
                <p>
                    선수금 마련 후 남은 필요 구매자금:{" "}
                    {result.remainingPurchaseAmount.toLocaleString()}원
                </p>
            </div>

            <button onClick={() => navigate("/goal-setting")}>
                계획 다시 조정하기
            </button>
        </div>
    );
}