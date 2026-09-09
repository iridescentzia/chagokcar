import { useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { calculatePlan } from "../utils/calculate";
import Header from "../components/Header";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import {formatWon, formatToManwon} from "../utils/format";

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
            <PageLayout>
                <Header />
                <p className="page-description">
                    목표 설정 정보가 없어요. 목표를 먼저 설정해주세요.
                </p>
                <Button onClick={() => navigate("/goal-setting")}>
                    목표 설정하러 가기
                </Button>
            </PageLayout>
        );
    }

    const result = calculatePlan(
        selectedVehicle.price,
        targetDownPayment,
        currentSavings,
        targetMonths
    );

    return (
        <PageLayout>
            <Header />
            <h1 className="page-title">
                목표 차량 구매를 위해
                <br />
                매월 이만큼 모아보세요
            </h1>

            <div className="monthly-highlight-box">
                <p className="monthly-highlight-label">월 필요 저축액</p>
                <p className="monthly-highlight-value">
                    {formatWon(result.monthlySavings)}
                </p>
            </div>

            <div className="monthly-info-list">
                <div className="monthly-info-row">
                    <span className="monthly-info-label">목표 차량</span>
                    <span className="monthly-info-value">{selectedVehicle.name}</span>
                </div>
                <div className="monthly-info-row">
                    <span className="monthly-info-label">예상 차량 가격</span>
                    <span className="monthly-info-value">
            {formatToManwon(selectedVehicle.price)}
          </span>
                </div>
                <div className="monthly-info-row">
                    <span className="monthly-info-label">목표 선수금</span>
                    <span className="monthly-info-value monthly-info-value--primary">
            {formatToManwon(targetDownPayment)}
          </span>
                </div>
                <div className="monthly-info-row">
                    <span className="monthly-info-label">현재 준비금</span>
                    <span className="monthly-info-value">
            {formatToManwon(currentSavings)}
          </span>
                </div>
                <div className="monthly-info-row">
                    <span className="monthly-info-label">앞으로 준비할 금액</span>
                    <span className="monthly-info-value">
            {formatToManwon(result.amountToSave)}
          </span>
                </div>
                <div className="monthly-info-row">
                    <span className="monthly-info-label">목표 기간</span>
                    <span className="monthly-info-value">{targetMonths}개월</span>
                </div>
            </div>

            <div className="monthly-remaining-box">
                <p className="monthly-remaining-label">
                    선수금 마련 후 남은 필요 구매자금
                </p>
                <p className="monthly-remaining-value">
                    {formatToManwon(result.remainingPurchaseAmount)}
                </p>
            </div>

            <p className="monthly-notice">현재 차량 가격을 기준으로 계산했어요.</p>

            <Button variant="secondary" onClick={() => navigate("/goal-setting")}>
                계획 다시 조정하기
            </Button>
            <Button onClick={() => navigate("/complete")}>확인</Button>
        </PageLayout>
    );
}