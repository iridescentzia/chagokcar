import { useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { calculatePlan } from "../utils/calculatePlan";
import Header from "../components/Header";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import { formatWon } from "../utils/format";

export default function PlanResult() {
    const navigate = useNavigate();
    const {
        selectedVehicle,
        expectedPurchasePrice,
        targetDownPayment,
        currentSavings,
        planMethod,
        targetMonths,
        monthlySavings,
    } = usePlan();

    if (!selectedVehicle || !targetDownPayment || !planMethod) {
        return (
            <PageLayout>
                <Header />
                <p className="page-description">
                    계획 정보가 없어요. 이전 단계를 먼저 진행해주세요.
                </p>
                <Button onClick={() => navigate("/plan-method")}>
                    준비 계획 세우러 가기
                </Button>
            </PageLayout>
        );
    }

    const result = calculatePlan({
        expectedPurchasePrice,
        targetDownPayment,
        currentSavings,
        planMethod,
        targetMonths,
        monthlySavings,
    });

    return (
        <PageLayout>
            <Header />
            <p className="plan-result-eyebrow">구매 준비 계획</p>
            <h1 className="page-title">
                {selectedVehicle.name}를 위해
                <br />
                이렇게 준비해보세요
            </h1>

            <div className="plan-result-highlight-box">
                {planMethod === "period" ? (
                    <>
                        <p className="plan-result-highlight-label">
                            매월 모아야 할 금액
                        </p>
                        <p className="plan-result-highlight-value">
                            {formatWon(result.monthlySavings)}
                        </p>
                        <p className="plan-result-highlight-desc">
                            목표 선수금 {formatWon(targetDownPayment)}을{" "}
                            {result.targetMonths}개월 안에 마련하기 위한 계획이에요.
                        </p>
                    </>
                ) : (
                    <>
                        <p className="plan-result-highlight-label">
                            선수금 마련까지 필요한 기간
                        </p>
                        <p className="plan-result-highlight-value">
                            {result.targetMonths}개월
                        </p>
                        <p className="plan-result-highlight-desc">
                            매월 {formatWon(result.monthlySavings)}씩 모을 경우의
                            예상 기간이에요.
                        </p>
                    </>
                )}
            </div>

            <div className="plan-result-info-list">
                <div className="plan-result-info-row">
                    <span className="plan-result-info-label">예상 구매 가격</span>
                    <span className="plan-result-info-value">
            {formatWon(expectedPurchasePrice)}
          </span>
                </div>
                <div className="plan-result-info-row">
                    <span className="plan-result-info-label">목표 선수금</span>
                    <span className="plan-result-info-value">
            {formatWon(targetDownPayment)}
          </span>
                </div>
                <div className="plan-result-info-row">
                    <span className="plan-result-info-label">현재 준비한 금액</span>
                    <span className="plan-result-info-value">
            {formatWon(currentSavings)}
          </span>
                </div>
                <div className="plan-result-info-row">
                    <span className="plan-result-info-label">앞으로 준비할 금액</span>
                    <span className="plan-result-info-value">
            {formatWon(result.amountToSave)}
          </span>
                </div>
                <div className="plan-result-info-row">
                    <span className="plan-result-info-label">선수금 마련 목표 기간</span>
                    <span className="plan-result-info-value">
            {result.targetMonths}개월
          </span>
                </div>
            </div>

            <div className="plan-result-remaining-box">
                <p className="plan-result-remaining-label">
                    선수금 마련 후 남는 차량 금액
                </p>
                <p className="plan-result-remaining-value">
                    {formatWon(result.remainingPurchaseAmount)}
                </p>
                <p className="plan-result-remaining-desc">
                    예상 구매 가격에서 목표 선수금을 제외한 금액이에요.
                    <br />
                    실제 결제 방식이나 금융 조건에 따라 달라질 수 있어요.
                </p>
            </div>

            <Button variant="secondary" onClick={() => navigate("/purchase-cost")}>
                구매 비용 자세히 보기
            </Button>
            <Button onClick={() => navigate("/complete")}>확인했어요</Button>
        </PageLayout>
    );
}